import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

const USAGE_KEY = "CACHE_CHATBOT_USAGE";
const DAILY_AI_LIMIT = 20;

let usageCache = null;

async function loadFromStorage(key) {
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : null;
}

async function saveToStorage(key, data) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

//fetch AI usage info
export const fetchAIUsage = async () => {
    //check cache
    if (usageCache) {
        console.log("using cached AI usage");
        return {
            allowed: usageCache.count < DAILY_AI_LIMIT,
            remaining: Math.max(0, DAILY_AI_LIMIT - usageCache.count),
            limit: DAILY_AI_LIMIT,
            return: usageCache.count
        };
    }
    //check async storage
    const stored = await loadFromStorage(USAGE_KEY);
    if(stored) {
        const today = new Date().toISOString().split('T')[0];
        //check if cache data is from today
        if (stored.date === today) {
            usageCache = stored;
            console.log("using AsyncStorage cached AI usage");
            return {
                allowed: stored.count < DAILY_AI_LIMIT,
                remaining: Math.max(0, DAILY_AI_LIMIT - stored.count),
                limit: DAILY_AI_LIMIT,
                count: stored.count
            };
        } else {
            //cache data is old = fetch new from firestore
            console.log("cached AI usage is stale, fetching new data");
        }
    }

    //fetch from firestore
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        //if not logged in, return local-only usage
        if (!user) {
            return await getLocalUsage(); 
        }
        
        const today = new Date().toISOString().split('T')[0];
        const usageDoc = await getDoc(doc(db, 'chatbot_usage', user.uid));

        if (usageDoc.exists()) {
            const data = usageDoc.data();

            if (data.date === today) {
                const count = data.count || 0;
                usageCache = { date: today, count };
                await saveToStorage(USAGE_KEY, usageCache);

                console.log("AI usage loaded from firestore");
                return {
                    allowed: count < DAILY_AI_LIMIT,
                    remaining: Math.max(0, DAILY_AI_LIMIT - count),
                    limit: DAILY_AI_LIMIT,
                    count
                };
            } else {
                //new day = reset count in firestore
                const { setDoc } = await import ('firebase/firestore');
                await setDoc(doc(db, 'chatbot_usage', user.uid), {
                    date: today,
                    count: 0,
                    userId: user.uid,
                    lastReset: new Date(). toISOString()
                });

                usageCache = { date: today, count: 0 };
                await saveToStorage(USAGE_KEY, usageCache);

                console.log("AI usage reset for new day");
                return {
                    allowed: true,
                    remaining: DAILY_AI_LIMIT,
                    limit: DAILY_AI_LIMIT,
                    count: 0
                };
            }
        } else {
            //first time = create document
            const { setDoc } = await import('firebase/firestore');
            await setDoc(doc(db, 'chatbot_usage', user.uid), {
                date: today,
                count: 0,
                userId: user.uid,
                createdAt: new Date().toISOString()
            });

            usageCache = { date: today, count: 0 };
            await saveToStorage(USAGE_KEY, usageCache);

            console.log("AI usage initialized in firestore");
            return {
                allowed: true,
                remaining: DAILY_AI_LIMIT,
                limit: DAILY_AI_LIMIT,
                count: 0
            };
        }
    } catch (error) {
        console.error("error fetching AI usage:", error);
        return await getLocalUsage();
    }
};

export const incrementAIUsage = async() => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            return await incrementLocalUsage();
        }

        const today = new Date().toISOString().split('T')[0];
        const { updateDoc, setDoc, increment } = await import('firebase/firestore');
        const usageRef = doc(db, 'chatbot_usage', user.uid);
        const usageDoc = await getDoc(usageRef);

        if (usageDoc.exists()) {
            const data = usageDoc.data();

            if (data.date === today) {
                await updateDoc(usageRef, {
                    count: increment(1),
                    lastMessageAt: new Date().toISOString()
                });

                const newCount = (data.count || 0) + 1;
                usageCache = { date: today, count: newCount };
                await saveToStorage(USAGE_KEY, usageCache);
                console.log("AI usage incremented in firestore");
            } else {
                await setDoc(usageRef, {
                    date: today,
                    count: 1,
                    userId: user.uid,
                    lastReset: new Date().toISOString(),
                    lastMessageAt: new Date().toISOString()
                });

                usageCache = { date: today, count: 1 };
                await saveToStorage(USAGE_KEY, usageCache);
                console.log("AI usage reset and incremented for new day");
            }
        } else {
            await setDoc(usageRef, {
                date: today,
                count: 1,
                userId: user.uid,
                createdAt: new Date().toISOString(),
                lastMessageAt: new Date().toISOString()
            });

            usageCache = { date: today, count: 1 };
            await saveToStorage(USAGE_KEY, usageCache);
            console.log("AI usage initialized with first message");
        }

        return true;

    } catch (error) {
        console.error("error incrementing chatbot usage:", error);
        return await incrementLocalUsage();
    }
};

const getLocalUsage = async () => {
    const LOCAL_USAGE_KEY = "LOCAL_AI_USAGE";
    const stored = await loadFromStorage(LOCAL_USAGE_KEY);
    const today = new Date().toDateString();

    if (stored && stored.date === today) {
        return {
            allowed: stored.count < DAILY_AI_LIMIT,
            remaining: Math.max(0, DAILY_AI_LIMIT - stored.count),
            limit: DAILY_AI_LIMIT,
            count: stored.count
        };
    }

    await saveToStorage(LOCAL_USAGE_KEY, { date: today, count: 0 });
    return {
        allowed: true,
        remaining: DAILY_AI_LIMIT,
        limit: DAILY_AI_LIMIT,
        count: 0
    };
};

const incrementLocalUsage = async () => {
    const LOCAL_USAGE_KEY = "LOCAL_AI_USAGE";
    const stored = await loadFromStorage(LOCAL_USAGE_KEY);
    const today = new Date().toDateString();

    if (stored && stored.date === today) {
        const newCount = stored.count + 1;
        await saveToStorage(LOCAL_USAGE_KEY, { date: today, count: newCount });
    } else {
        await saveToStorage(LOCAL_USAGE_KEY, { date: today, count: 1 });
    }

    return true;
};

export const clearAIUsageCache = async () => {
    usageCache = null;
    await AsyncStorage.removeItem(USAGE_KEY);
    console.log("AI usage cache cleared");
};

export const getAIUsageInfo = async () => {
    return await fetchAIUsage();
};
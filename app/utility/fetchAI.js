import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const today = new Date().toISOString().split('T')[0];

    //check cache
    if ( usageCache && usageCache.date == today) {
        console.log("using cached AI usage");
        return {
            remaining: Math.max(0, DAILY_AI_LIMIT - usageCache.count),
            limit: DAILY_AI_LIMIT,
            count: usageCache.count
        };
    }

    //check async storage
    const stored = await loadFromStorage(USAGE_KEY);
    if(stored && stored.date === today) {
        usageCache = stored;
        console.log("Using AsyncStorage cached AI usage");
        return{
            remaining: Math.max(0, DAILY_AI_LIMIT - usageCache.count),
            limit: DAILY_AI_LIMIT,
            count: stored.count
        };
    }

    //new day or no cache
    const fresh = { date: today, count: 0 };
    usageCache = fresh;
    await saveToStorage(USAGE_KEY, fresh);
    console.log("AI usage reset for new day");

    return {
        remaining: DAILY_AI_LIMIT,
        limit: DAILY_AI_LIMIT,
        count: 0
    };
};

export const updateLocalUsageCache = async (remaining) => {
    const today = new Date().toISOString().split('T')[0];
    const count = DAILY_AI_LIMIT - remaining;
    usageCache = { date: today, count };
    await saveToStorage(USAGE_KEY, usageCache);
    console.log("local AI usage cache updated:", count);
};


export const clearAIUsageCache = async () => {
    usageCache = null;
    await AsyncStorage.removeItem(USAGE_KEY);
    console.log("AI usage cache cleared");
};
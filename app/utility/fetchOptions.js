import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* NOTE:
AsyncStorage basically will save a copy of everything even
when the app reloads. The first call to the database will
trigger the "using cached conditions" console log, since it
is loading this data for the first time. After that, if the
app is reloaded, this data should all still be saved, preventing
another call to the database.
*/

// for AsyncStorage
const COND_KEY = "CACHE_CONDITIONS";
const ALLERGY_KEY = "CACHE_ALLERGIES";
const DIET_KEY = "CACHE_DIET";

let condCache = null;
let allergyCache = null;
let dietCache = null;

// AsyncStorage functions
async function loadFromStorage(key) {
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : null;
}
async function saveToStorage(key, data) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

//fetch conditions from firestore
export const fetchCond = async () => {

    if(condCache) {
        console.log("using cached conditions");
        return condCache;
    }
    
    // check AsyncStorage next
    const stored = await loadFromStorage(COND_KEY);
    if (stored) {
        condCache = stored;
        console.log("using AsyncStorage cached conditions");
        return condCache;
    }

    try {
        const condDoc = await getDoc(doc(db, 'options', 'conditions'));

        if (condDoc.exists()) {
            //store conditions in cache
            condCache = condDoc.data().items;

            // persist conditions to local storage
            await saveToStorage(COND_KEY, condCache);
            
            console.log("conditions loaded from firestore");
            return condCache;
        } else {
            console.log("no conditions document in firestore");
            return [];
        }
    } catch (error) {
        console.error("error fetching conditions:", error);
        return [];
    }
};

//fetch allergies from firestore
export const fetchAllergies = async () => {

    if (allergyCache) {
        console.log("using cached allergies");
        return allergyCache;
    }

    const stored = await loadFromStorage(ALLERGY_KEY);
    if (stored) {
        allergyCache = stored;
        console.log("using AsyncStorage cached allergies");
        return allergyCache;
    }
  
    try {
        const allergiesDoc = await getDoc(doc(db, 'options', 'allergies'));
    
        if (allergiesDoc.exists()) {
            //store allergies in cache
            allergyCache = allergiesDoc.data().items;

            // persist allergies to local storage
            await saveToStorage(ALLERGY_KEY, allergyCache);
            
            console.log("allergies loaded from firestore");
            return allergyCache;
        } else {
            console.log("no allergies document found in Firestore");
            return [];
        }
    } catch (error) {
        console.error("error fetching allergies:", error);
        return [];
    }
};

//fetch dietary preferences from firestore 
export const fetchDiet = async () => {

    if(dietCache) {
        console.log("using cached dietary preferences");
        return dietCache;
    }

    const stored = await loadFromStorage(DIET_KEY);
    if (stored) {
        dietCache = stored;
        console.log("using AsyncStorage cached dietary preferences");
        return dietCache;
    }
    
    try {
        const dietDoc = await getDoc(doc(db, 'options', 'dietary-preferences'));

        if (dietDoc.exists()) {
            //store conditions in cache
            dietCache = dietDoc.data().items;

            // persist diet pref to local storage
            await saveToStorage(DIET_KEY, dietCache); 

            console.log("dietary preferences loaded from firestore");
            return dietCache;
        } else {
            console.log("no dietary preferences document in firestore");
            return [];
        }
    } catch (error) {
        console.error("error fetching dietary preferences:", error);
        return [];
    }
};

//clear caches
export const clearCondCache = async () => {
    condCache = null;
    await AsyncStorage.removeItem(COND_KEY);
    console.log("condition cache cleared");
};

export const clearAllergyCache = async () => {
    allergyCache = null;
    await AsyncStorage.removeItem(ALLERGY_KEY);
    console.log("allergy cache cleared");
};

export const clearDietCache = async () => {
    dietCache = null;
    await AsyncStorage.removeItem(DIET_KEY);
    console.log("dietary preferences cache cleared");
};

//get condition by ID
export const getCondById = async (id) => {
    const conditions = await fetchCond();
    return conditions.find(c => c.id === id);
};

//get allergy by ID
export const getAllergyById = async (id) => {
    const allergies = await fetchAllergies();
    return allergies.find(a => a.id === id);
};

//get dietary preference by ID
export const getDietById = async (id) => {
    const dietaryPref = await fetchDiet();
    return dietaryPref.find(d => d.id === id);
};
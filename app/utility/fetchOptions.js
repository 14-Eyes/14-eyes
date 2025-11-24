import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

let condCache = null;
let allergyCache = null;

//fetch conditions from firestore
export const fetchCond = async () => {

    if(condCache) {
        console.log("using cached conditions");
        return condCache;
    }
    
    try {
        const condDoc = await getDoc(doc(db, 'options', 'conditions'));

        if (condDoc.exists()) {
            //store conditions in cache
            condCache = condDoc.data().items;
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
  
    try {
        const allergiesDoc = await getDoc(doc(db, 'options', 'allergies'));
    
        if (allergiesDoc.exists()) {
            //store allergies in cache
            allergyCache = allergiesDoc.data().items;
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

//clear caches
export const clearCondCache = () => {
    condCache = null;
    console.log("condition cache cleared");
};

export const clearAllergyCache = () => {
    allergyCache = null;
    console.log("allergy cache cleared");
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

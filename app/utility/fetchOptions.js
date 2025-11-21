import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

let condCache = null;

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
            condCache = condDoc.data().items
            console.log('conditions loaded from firestore');
            return condCache;
        } else {
            console.log('no conditions document in firestore');
            return [];
        }
    } catch (error) {
        console.error("error fetching conditions:", error);
        return [];
    }
};

//clear condition cache
export const clearCondCache = () => {
    condCache = null;
    console.log("condition cache cleared");
};

//get condition by ID
export const getCondById = async (id) => {
    const conditions = await fetchCond();
    return conditions.find(c => c.id === id);
};
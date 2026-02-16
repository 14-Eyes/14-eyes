// ----------------------------
// CONDITIONS SCANNING LOGIC
// ----------------------------

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchCond } from "./fetchOptions";
import { checkNutritions } from '../utility/checkNutrition';


export async function checkConditions(ingredientsText, nutrients) {
    try {

        const auth = getAuth();
        const db = getFirestore();

        const uid = auth.currentUser.uid; // get user id to load saved conditions

        // get user document (user's conditions); these are saved inside userConditions
        const userDoc = await getDoc(doc(db, "users", uid));
        const userConditions = userDoc.data()?.conditions || [];

        // if user has no conditions stored, set condition arrays to empty, exit and do not continue running the function
        if (userConditions.length === 0) {
            return { good: [], avoid: [] };
        }

        // load the big conditions document from Firebase (inside objects collection); uses AsyncStorage
            // const condDoc = await getDoc(doc(db, "options", "conditions"));
            // const allConditions = condDoc.data().items;
        const allConditions = await fetchCond();

        // save only the conditions that match what the user has currently set
        const active = allConditions.filter((c) =>
            userConditions.includes(c.id)
        );

        // --- Scan all ingredients for text matches ---
        const lowerIngredients = ingredientsText.toLowerCase();
        const results = { good: [], avoid: [], badNutri: false};

        active.forEach((cond) => {
            // scan for good matches; store in good
            cond.good.forEach((g) => {
                if (lowerIngredients.includes(g.toLowerCase())) {
                    results.good.push({
                        ingredient: g,
                        condition: cond.label,
                    })
                }
            });
            // scan for bad matches; store in avoid
            cond.avoid.forEach((a) => {
                if (lowerIngredients.includes(a.toLowerCase())) {
                    results.avoid.push({
                        ingredient: a,
                        condition: cond.label,
                    })
                }
            });
        });

        const nutriResults = await checkNutritions(nutrients);
        if(nutriResults)
        {
            results.badNutri=true; //Needs verification, object vs string
        }

        // ---------------------------------------------
        return results;
    } catch (err) {
        console.log("Condition scan failed:", err);
    }
}
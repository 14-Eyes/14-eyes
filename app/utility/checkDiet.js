// ----------------------------
// DIETARY PREFERENCES SCANNING LOGIC
// ----------------------------

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchDiet } from "./fetchOptions";
import { checkNutritions } from '../utility/checkNutrition';

// set the base available open food facts (off) non-diet variables (currently i think only these 2 exist in OFF)
const OFF_DIET_CONFLICTS = {
    vegetarian: "non-vegetarian",
    vegan: "non-vegan",
};

export async function checkDiet(ingredientsText, offLabels = [], offAnalysis = [], nutrients) {
    try {
        const auth = getAuth();
        const db = getFirestore();

        const uid = auth.currentUser.uid; // get user id to load saved diets

        // get user document (user's diets); these are saved inside userDiets
        const userDoc = await getDoc(doc(db, "users", uid));
        const userDiets = userDoc.data()?.dietary_preferences || [];

        // if user has no diets stored, set diet arrays to empty, exit and do not continue running the function
        if (userDiets.length === 0) {
            return { avoid: [], certifications: [], offConflicts: [], };
        }

        // load the big diets document from Firebase (inside objects collection); uses AsyncStorage
        const allDiets = await fetchDiet();
        
        // save only the diets that match what the user has currently set
        const active = allDiets.filter((d) =>
            userDiets.includes(d.id)
        );
        console.log("Here I am! : ", active.length);

        // --- Scan all ingredients and diet certifications for text matches ---
        const lowerIngredients = ingredientsText.toLowerCase();
        const foundAvoid = new Map();
        const foundCerts = new Set();
        const foundOffConflicts = new Map(); // stores off "non-vegan" or "non-vegetarian" matches with user set diet

        const lowerCerts = [...offLabels, ...offAnalysis].map(tag => 
            tag.replace(/^en:/, "").trim().toLowerCase()
        );

        active.forEach((diet) => {
            // scan for bad matches; store in avoid
            // scan for ingredient matches
            diet.avoid.forEach((raw) => {
                const d = raw.trim().toLowerCase();
                
                if (lowerIngredients.includes(d)) {
                    foundAvoid.set(d, diet.label);
                }
            });

            // scan for official diet certifications and official diet conflicts to send back to FoodDetails.js
            const dietKey = diet.label.toLowerCase();
            const conflictTag = OFF_DIET_CONFLICTS[dietKey];

            // diet certifications
            if (lowerCerts.includes(dietKey)) {
                foundCerts.add(diet.label);
            }
            
            // diet conflicts
            if (conflictTag && lowerCerts.includes(conflictTag)) {
                const key = `${diet.label}-${conflictTag}`;
                foundOffConflicts.set(key, {
                    diet: diet.label,
                    tag: conflictTag,
                });
            }
        });
        // ---------------------------------------------
        
        // convert "found" to expected array format
        const results = {
            avoid: Array.from(foundAvoid.entries()).map(
                ([ingredient, diet]) => ({
                    ingredient,
                    diet,
                })
            ),
            certifications: Array.from(foundCerts),
            offConflicts: Array.from(foundOffConflicts.values()),
        };
        
        console.log("DIET INGREDIENT MATCHES:", results.avoid);
        console.log("DIET CERTIFICATIONS MATCHED:", results.certifications);
        console.log("DIET CONFLICTS MATCHED:", results.offConflicts);

        const nutriResults = await checkNutritions(nutrients, 2);
        if(nutriResults)
        {
            results.badNutri=true;
        }

        return results;
    } catch (err) {
        console.log("Diet scan failed:", err);
    }
}
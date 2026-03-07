// ----------------------------
// ALLERGIES SCANNING LOGIC
// ----------------------------

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchAllergies } from "./fetchOptions";

export async function checkAllergies(ingredientsText, allergensTags = [], nutrients) {
    try {

        const auth = getAuth();
        const db = getFirestore();

        const uid = auth.currentUser.uid; // get user id to load saved allergies

        // get user document (user's allergies); these are saved inside userAllergies
        const userDoc = await getDoc(doc(db, "users", uid));
        const userAllergies = userDoc.data()?.allergies || [];

        // if user has no allergies stored, set allergy arrays to empty, exit and do not continue running the function
        if (userAllergies.length === 0) {
            return { avoid: [] };
        }

        // load the big allergies document from Firebase (inside objects collection); uses AsyncStorage
            // const allergiesDoc = await getDoc(doc(db, "options", "allergies"));
            // const allAllergies = allergiesDoc.data().items;
        const allAllergies = await fetchAllergies();

        // save only the allergies that match what the user has currently set
        const active = allAllergies.filter((a) =>
            userAllergies.includes(a.id)
        );

        // --- Scan all ingredients and allergies for text matches ---
        const lowerIngredients = ingredientsText.toLowerCase();
        const found = new Map();

        const lowerTags = allergensTags.map(tag =>
            tag.replace(/^en:/, "").trim().toLowerCase()
        );

        active.forEach((allergy) => {
            // scan for bad matches; store in avoid
            allergy.avoid.forEach((raw) => {
                const a = raw.trim().toLowerCase();

                lowerTags.forEach(tag => {
                    if (tag.includes(a) || a.includes(tag)) {
                        found.set(a, allergy.label);
                    }
                });

                if (lowerIngredients.includes(a)) {
                    found.set(a, allergy.label);
                }
            });
        });
        // ---------------------------------------------
        
        // convert "found" to expected array format
        const results = {
            avoid: Array.from(found.entries()).map(
                ([ingredient, allergy]) => ({
                    ingredient,
                    allergy,
                })
            ),
        };
        
        console.log("ALLERGY RAW MATCHES:", results.avoid);

        return results;
    } catch (err) {
        console.log("Allergy scan failed:", err);
    }
}
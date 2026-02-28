// ----------------------------
// GOOD SUGARS SCANNING LOGIC
// ----------------------------

import { fetchGoodSugars } from "./fetchOptions";

export async function checkGoodSugars(ingredientsText) {
    try {
        
        //fetch good sugars from firebase
        const allGoodSugars = await fetchGoodSugars();

        //if no sugars stored, exit function with a empty array
        if (allGoodSugars.length === 0) {
            return [];
        }

        //scans sugars for text matches
        const lowerIngredients = ingredientsText.toLowerCase();
        const results = [];

        //scan for good sugar matches and stores them in results array
        allGoodSugars.forEach((sugar) => {
            if (lowerIngredients.includes(sugar.label.toLowerCase())) {
                results.push({
                    name: sugar.label
                });
            }
        });

        console.log(`found ${results.length} good sugars`);
        return results;

    } catch (err) {
        console.log("Good sugars scan failed:", err);
        return [];
    }
}
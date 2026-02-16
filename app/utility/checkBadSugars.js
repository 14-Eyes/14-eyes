// ----------------------------
// BAD SUGARS SCANNING LOGIC
// ----------------------------

import { fetchBadSugars } from "./fetchOptions";

export async function checkBadSugars(ingredientsText) {
    try {
        
        //fetch bad sugars from firebase
        const allBadSugars = await fetchBadSugars();

        //if no sugars stored, exit function with a empty array
        if (allBadSugars.length === 0) {
            return [];
        }

        //scans sugars for text matches
        const lowerIngredients = ingredientsText.toLowerCase();
        const results = [];

        //scan for bad sugar matches and stores them in results array
        allBadSugars.forEach((sugar) => {
            if (lowerIngredients.includes(sugar.label.toLowerCase())) {
                results.push({
                    name: sugar.label
                });
            }
        });

        console.log("found ", results.length, "bad sugars");
        return results;

    } catch (err) {
        console.log("Bad sugars scan failed:", err);
        return [];
    }
}
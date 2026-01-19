// ----------------------------
// DYES SCANNING LOGIC
// ----------------------------

import { fetchDyes } from "./fetchOptions";

export async function checkDyes(ingredientsText) {
    try {
        
        //fetch dyes from firebase
        const allDyes = await fetchDyes();

        //if no dyes stored, exit function with a empty array
        if (allDyes.length === 0) {
            return [];
        }

        //scans dyes for text matches
        const lowerIngredients = ingredientsText.toLowerCase();
        const results = [];

        //scan for bad sugar matches and stores them in results array
        allDyes.forEach((dye) => {
            if (lowerIngredients.includes(dye.label.toLowerCase())) {
                results.push({
                    name: dye.label
                });
            }
        });

        console.log(`found ${results.length} dyes`);
        return results;

    } catch (err) {
        console.log("Dyes scan failed:", err);
        return [];
    }
}
// ----------------------------
// PRESERVATIVES SCANNING LOGIC
// ----------------------------

import { fetchPreservatives } from "./fetchOptions";

export async function checkPreservatives(ingredientsText) {
    try {
        
        //fetch preservatives from firebase
        const allPreservatives = await fetchPreservatives();

        //if no preservatives stored, exit function with a empty array
        if (allPreservatives.length === 0) {
            return [];
        }

        //scans preservatives for text matches
        const lowerIngredients = ingredientsText.toLowerCase();
        const results = [];

        //scan for bad sugar matches and stores them in results array
        allPreservatives.forEach((preservative) => {
            if (lowerIngredients.includes(preservative.label.toLowerCase())) {
                results.push({
                    name: preservative.label
                });
            }
        });

        console.log("found ", results.length, "preservatives");
        return results;

    } catch (err) {
        console.log("Preservatives scan failed:", err);
        return [];
    }
}
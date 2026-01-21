// ----------------------------
// NUTRITION SCANNING LOGIC
// ----------------------------

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchCond } from "./fetchOptions";

//Currently limited to scanning info based on 100g, which is doubtful to reflect proper serving sizes. Requires adjustment
//Currently limited to providing only certain nutrion fact statistics. Requires attention
//Currently limtied to only working based on gram calculations. Requires attention
//Currently limited to only working if each condition number is different. Requires adjustment

//Firebase key
// 0 - Calories
// 1 - Total Fat
// 2 - Saturated Fat
// 3 - Sodium 
// 4 - Total Carbohydrates 
// 5 - Fiber 
// 6 - Total Sugar 
// 7 - Protein

export async function checkNutritions(nutrients) {
    try {

        const auth = getAuth();
        const db = getFirestore();

        const uid = auth.currentUser.uid; // get user id to load saved conditions

        // get user document (user's conditions); these are saved inside userConditions
        const userDoc = await getDoc(doc(db, "users", uid));
        
        //may need attention for pulling data 
        const userConditions = userDoc.data()?.conditions || [];

        // if user has no conditions stored, set condition arrays to empty, exit and do not continue running the function
        if (userNutrients.length === 0) {
            return { Nutrient_Min: [], Nutrient_Max: [] };
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
        const lowerIngredients = nutrients.toLowerCase();
        const results = {Nutrient_Min: [], Nutrient_Max: [] };

        const calories = nutrients.energy-kcal;
        const totalFat = nutrients.fat;
        const saturatedFat = nutrients.saturated-fat;
        const sodium = nutrients.sodium;
        const totalCarbohydrates = nutrients.carbohydrates;
        const fiber = nutrients.fiber;
        const totalSugar = nutrients.sugars;
        const protein = nutrients.proteins;

        active.forEach((cond) => {
            // Optional if we have nutrient minimums, could be useful for diets.
            /*
            cond.Nutrient_Min.forEach((g) => {
                if (lowerIngredients.includes(g.toLowerCase())) {
                    results.Nutrient_Min.push({
                        ingredient: g,
                        condition: cond.label,
                    })
                }
            });*/
            // scan for bad matches; store in Nutrient_Max
            cond.Nutrient_Max.forEach((a) => {
                //switch case for the firebase nutrient records
                //checks if appropriate nutrient is within acceptable range
                    // the .01 is a saftey check, for example if there is not limit to a particular nutrient it will be .01,
                    // but if it can't have any it will be 0
                    //May be worth replacing with static for loop if possible
                switch(userConditions.indexOf(a))
                {
                    case 0:
                        if(calories>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    case 1: 
                        if(totalFat>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    case 2:
                        if(saturatedFat>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    case 3:
                        if(sodium>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    case 4:
                        if(totalCarbohydrates>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    case 5:
                        if(fiber>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    case 6:
                        if(totalSugar>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    case 7:
                        if(protein>=a&&a!=.01)
                        {
                            console.log("This is bad.")
                        }
                        break;
                    default:
                        console.log("This is done.")
                }
            });
        });
        // ---------------------------------------------

        return results;
    } catch (err) {
        console.log("Nutrition scan failed:", err);
    }
}
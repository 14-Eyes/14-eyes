// ----------------------------
// NUTRITION SCANNING LOGIC
// ----------------------------

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchCond } from "./fetchOptions";

//Currently limited to scanning info based on 100g, which is doubtful to reflect proper serving sizes. Requires adjustment
//Currently limited to providing only certain nutrion fact statistics. Requires attention
//Currently limtied to only working based on gram calculations. Requires attention
//Currenlty limited to relying on every nutrition being available from the json. Requires attention
// Optional we could have nutrient minimums, would be useful for diets.
//Fixed only working if each condition number is different. Requires adjustment

//Need to add additional int parameter to hanlde conditions, allergies, and diets serpately
            

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
        
        const itemNutris = [calories, totalFat, saturatedFat, sodium, totalCarbohydrates, fiber, totalSugar, protein]
        let badRange=false;
        
        active.forEach((cond) => {
            let i =0;
            cond.Nutrient_Max.forEach((a) => {
                //Arry scanning for firebase nutrient records
                //checks if appropriate nutrient is within acceptable range
                    // the .01 is a saftey check, for example if there is not limit to a particular nutrient it will be .01,
                    // but if the user can't have any it will be 0
                if(a>=itemNutris[i]&&a!=.01)
                {
                    console.log("This is bad.")
                    badRange=true;
                }
                i++;
            });
        });
        // ---------------------------------------------

        return badRange;
    } catch (err) {
        console.log("Nutrition scan failed:", err);
    }
}
// ----------------------------
// DIETARY PREFERENCES SCANNING LOGIC
// ----------------------------

/* 
available diets + what their check criteria is: 
- all natural (thumbs up/down based on ingredients and also based on the NOVA score (score 1-2 is good, 3-4 is bad), still shows official certs from OFF when found, but this does not influence thumbs up/down)
- DASH (thumbs up/down based primarily on ingredients)
- gluten free (thumbs up/down based on ingredients, show the official "gluten-free" label if found)
- halal (thumbs up/down based on ingredients, still show official certs from OFF when found, but this does not influence thumbs up/down)
- kosher (thumbs up/down based on ingredients, still show official certs from OFF when found, but this does not influence thumbs up/down)
- keto (thumbs up/down based on ingredients, still show official certs from OFF when found, but this does not influence thumbs up/down)
- low-carb (primarily based off the grams of carbs in the item, plus some avoid ingredients)
- lactose free (based soley on the ingredients)
- organic (thumbs up/down only based on official "organic" label)
- pescetarian (thumbs up/down based on ingredients, still show official certs from OFF when found, but this does not influence thumbs up/down)
- paleo (thumbs up/down based on ingredients and also based on the NOVA score (score 1-2 is good, 3-4 is bad))
- vegan (thumbs up/down based on ingredients, still show official certs from OFF when found, but this does not influence thumbs up/down)
- vegetarian (thumbs up/down based on ingredients, still show official certs from OFF when found, but this does not influence thumbs up/down)
*/


import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { fetchDiet } from "./fetchOptions";
import { checkNutritions } from '../utility/checkNutrition';

// set the base available open food facts (off) non-diet variables (currently i think only these 2 exist in OFF)
const OFF_DIET_CONFLICTS = {
    vegetarian: "non-vegetarian",
    vegan: "non-vegan",
};

// diet behavior configuration:
// this sets the base array values for each diet, since they all require different checks to determine if the diet is met or violated
// unsure if there is a better way to do this as of right now (i.e. store in FireBase)
/* 
    you'll notice some diets, such as vegan or keto, have officially recognized certs/labels,
    but they do not have the "checkCert" value.
    that is because items can be considered of this diet without having an official cert/label,
    although the official cert/label is still show to the user when it is found
*/
// checkIngredients = scan Firebase avoid ingredients
// checkNova = check the NOVA score
// checkCert = check for official cert (required)
// checkCertOnly = ignore ingredients and check for official cert only
const DIET_RULES = {
  "all natural": { checkIngredients: true, checkNova: true },
  "dash": { checkIngredients: true },
  "gluten free": { checkIngredients: true },
  "halal": { checkIngredients: true },
  "kosher": { checkIngredients: true },
  "keto": { checkIngredients: true },
  "low-carb": { checkIngredients: true }, // placeholder for now, this is the wildcard diet
  "lactose free": { checkIngredients: true },
  "organic": { checkIngredients: false, checkCertOnly: true },
  "pescetarian": { checkIngredients: true },
  "paleo": { checkIngredients: true, checkNova: true },
  "vegan": { checkIngredients: true },
  "vegetarian": { checkIngredients: true },
};

export async function checkDiet(ingredientsText, offLabels = [], offAnalysis = [], nutrients, novaGroup = null) {
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
        const allDiets = (await fetchDiet()) || [];
        
        // save only the diets that match what the user has currently set
        const active = allDiets.filter((d) =>
            userDiets.includes(d.id)
        );
        console.log("Here I am! : ", active.length);

        // --- Scan all ingredients and diet certifications for text matches ---
        const lowerIngredients = (ingredientsText || "").toLowerCase();
        const lowerCerts = [...offLabels, ...offAnalysis].map((tag) =>
            tag.replace(/^en:/, "").trim().toLowerCase()
        );

        const foundAvoid = new Map();
        const foundCerts = new Set();
        const foundOffConflicts = new Map(); // stores off "non-vegan" or "non-vegetarian" matches with user set diet

        // process each diet individually
        active.forEach((diet) => {
            // scan for bad matches; store in avoid
            
            const label = diet.label;
            const dietKey = label.toLowerCase();
            const rules = DIET_RULES[dietKey] || {};

            let hasIngredientConflict = false;
            let hasOffConflict = false;
            let novaConflict = false;
            let explanation = "";
            let ingredients = [];

            // check for official diet certs first
            let hasOfficialCert = lowerCerts.some(tag => tag.includes(dietKey));
            if (hasOfficialCert) {
                foundCerts.add(label);
                console.log(`Certification found for ${label}`);
            }

            // scan for ingredient matches
            if (rules.checkIngredients && diet.avoid) {
                diet.avoid.forEach((raw) => {
                    const d = raw.trim().toLowerCase();
                    if (lowerIngredients.includes(d)) {
                        hasIngredientConflict = true;
                        ingredients.push(raw);
                        console.log(`Ingredient conflict for ${label}:`, d);
                    }
                });
            }

            // diet conflicts
            const conflictTag = OFF_DIET_CONFLICTS[dietKey];
            if (conflictTag && lowerCerts.includes(conflictTag)) {
                hasOffConflict = true;

                const key = `${label}-${conflictTag}`;
                foundOffConflicts.set(key, {
                    diet: label,
                    tag: conflictTag,
                });
                console.log(`OFF conflict found for ${label}:`, conflictTag);
            }

            // nova score check (must be 1 or 2)
            if (rules.checkNova && novaGroup && novaGroup >= 3) {
                novaConflict = true;
                explanation = `This product is classified as NOVA Group ${novaGroup}, which is considered ultra-processed and conflicts with your ${label} diet.`;
                console.log(`NOVA conflict for ${label}: Group`, novaGroup);
            }

            // determines what to send back to FoodDetails.js
            let isDietBad = false;

            // Organic: ONLY cert check here
            if (rules.checkCertOnly) {
                isDietBad = !hasOfficialCert;
                if (!hasOfficialCert) {
                    explanation = `This product does not have an official ${label} certification.`;
                    ingredients = [`Missing ${label} certification`];
                }
            }
            // // Gluten Free: must have no bad ingredients AND gluten free certification
            // else if (dietKey === "gluten free") {
            //     // fail if either ingredient conflict OR missing certification
            //     isDietBad = hasIngredientConflict || !hasOfficialCert;

            //     if (hasIngredientConflict) {
            //         explanation = `This product contains ${ingredients.join(", ")}, which does not align with your ${label} diet.`;
            //     } 
            //     else if (!hasOfficialCert) {
            //         explanation = `This product is not certified ${label}.`;
            //         ingredients = [`Missing ${label} certification`];
            //     }
            //     // console.log("DIET: gluten free detected");
            // }
            // General ingredient-based
            else {
                isDietBad =
                    hasIngredientConflict ||
                    hasOffConflict ||
                    novaConflict;

                if (hasIngredientConflict && !explanation) {
                    explanation = `Which may not align with your ${label} diet.`;
                }
            }

            // // diet certifications
            // if (!isDietBad && lowerCerts.some(tag => tag.includes(dietKey))) {
            //     hasOfficialCert = true;
            //     foundCerts.add(label);
            //     console.log(`Certification found for ${label}`);
            // }

            // store all results
            foundAvoid.set(label, {
                diet: label,
                hasIngredientConflict,
                hasOfficialCert,
                hasOffConflict,
                novaConflict,
                isDietBad,
                explanation,
                ingredients,
            });
        });
        // ---------------------------------------------
        
        // // convert "found" to expected array format
        // const results = {
        //     avoid: Array.from(foundAvoid.entries()).map(
        //         ([ingredient, diet]) => ({
        //             ingredient,
        //             diet,
        //         })
        //     ),
        //     certifications: Array.from(foundCerts),
        //     offConflicts: Array.from(foundOffConflicts.values()),
        // };

        const results = {
            avoid: Array.from(foundAvoid.values()),
            certifications: Array.from(foundCerts),
            offConflicts: Array.from(foundOffConflicts.values()),
        };    
        console.log("DIET INGREDIENT MATCHES:", results.avoid);
        console.log("DIET CERTIFICATIONS MATCHED:", results.certifications);
        console.log("DIET CONFLICTS MATCHED:", results.offConflicts);

        const nutriResults = await checkNutritions(nutrients, 2);
        if (nutriResults?.badNutri) {
            results.badNutri = true;
            results.nutrientViolations = nutriResults.violations;
        } else {
            results.badNutri = false;
            results.nutrientViolations = [];
        }

        return results;

    } catch (err) {
        console.log("Diet scan failed:", err);
        return { avoid: [], certifications: [], offConflicts: [] };
    }
}
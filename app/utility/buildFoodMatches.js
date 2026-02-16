// -------------------------------------------------
// Function use to build array of ingredient matches (good and/or bad) for each condition/allergy/diet the user has set.
// This is primarily used for UI display

// for reference, each of these contains an avoid[] array and  good[] array
// inside each of those arrays is a list of objects that is structured as follows:
//      { ingredient: "sugar", condition: "cancer" }
//      { ingredient: "soybean", allergy: "soy" }
// this format is necessary for later UI output to know what ingredient was flagged by what cond/allergy/diet
export function buildFoodMatches({
  conditionMatches,
  allergyMatches,
  dietMatches,
}) {
    const foundFoodInfo = []; // array to store all of the above matches

    /* ---------------- CONDITIONS ---------------- */
    const conditionGroups = {};

    // BAD ingredients
    conditionMatches.avoid.forEach(({ ingredient, condition }) => {
        const key = `${condition}-bad`;

        if (!conditionGroups[key]) {
        conditionGroups[key] = {
            severity: "bad",
            condition,
            ingredients: [],
        };
        }

        conditionGroups[key].ingredients.push(ingredient);
    });

    // GOOD ingredients
    conditionMatches.good.forEach(({ ingredient, condition }) => {
        const key = `${condition}-good`;

        if (!conditionGroups[key]) {
        conditionGroups[key] = {
            severity: "good",
            condition,
            ingredients: [],
        };
        }

        conditionGroups[key].ingredients.push(ingredient);
    });

    Object.values(conditionGroups).forEach(group => {
        foundFoodInfo.push({
        type: "condition",
        severity: group.severity,
        ingredients: group.ingredients,
        explanation:
            group.severity === "bad"
            ? `Which may worsen your ${group.condition} condition.`
            : `Which may help lessen your ${group.condition} condition.`,
        });
    });
    /* -------------------------------------------- */


    /* ---------------- ALLERGIES ----------------- */
    const allergyGroups = {};

    allergyMatches.avoid.forEach(({ ingredient, allergy }) => {
        if (!allergyGroups[allergy]) {
        allergyGroups[allergy] = {
            allergy,
            ingredients: [],
        };
        }

        allergyGroups[allergy].ingredients.push(ingredient);
    });

    Object.values(allergyGroups).forEach(group => {
        foundFoodInfo.push({
        type: "allergy",
        severity: "bad",
        ingredients: group.ingredients,
        explanation: `Which may cause an allergic reaction due to your ${group.allergy} allergy.`,
        });
    });
    /* -------------------------------------------- */

    /* ------------------ DIETS ------------------- */
    const dietGroups = {};

    dietMatches.avoid.forEach(({ ingredient, diet }) => {
        if (!dietGroups[diet]) {
        dietGroups[diet] = {
            diet,
            ingredients: [],
        };
        }

        dietGroups[diet].ingredients.push(ingredient);
    });

    Object.values(dietGroups).forEach(group => {
        foundFoodInfo.push({
        type: "diet",
        severity: "bad",
        ingredients: group.ingredients,
        explanation: `Which does not align with your ${group.diet} diet.`,
        });
    });
    /* -------------------------------------------- */

    const groupedInfo = foundFoodInfo.reduce(
        (acc, item) => {
        acc[item.type].push(item);
        return acc;
        },
        { condition: [], allergy: [], diet: [] }
    );

    return { foundFoodInfo, groupedInfo };
}
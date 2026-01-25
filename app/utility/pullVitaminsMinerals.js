// ----------------------------
// PULL VITAMINS AND MINERALS FROM OPENFOODFACTS
// ----------------------------

export const extractVitaminsMinerals = (nutrients) => {

    //initial check for nutrient data
    if (!nutrients || typeof nutrients !== 'object') {
        console.log("No nutrient data available :(");
        return [];
    }

    const vitaminsAndMinerals = {
        //vitamins
        'vitamin-a': 'Vitamin A',
        'vitamin-b1': 'Vitamin B1',
        'vitamin-b2': 'Vitamin B2',
        'vitamin-b3': 'Vitamin B3',
        'vitamin-b6': 'Vitamin B6',
        'vitamin-b9': 'Vitamin B9',
        'vitamin-b12': 'Vitamin B12',
        'vitamin-c': 'Vitamin C',
        'vitamin-d': 'Vitamin D',
        'vitamin-e': 'Vitamin E',
        'vitamin-k': 'Vitamin K',

        //minerals
        'calcium': 'Calcium',
        'iron': 'Iron',
        'magnesium': 'Magnesium',
        'phosphorus': 'Phosphorus',
        'potassium': 'Potassium',
        'sodium': 'Sodium',
        'zinc': 'Zinc',
        'copper': 'Copper',
        'manganese': 'Manganese',
        'selenium': 'Selenium',
        'chromium': 'Chromium',
        'iodine': 'Iodine',

    };

    const found = [];

    for (const [key, displayName] of Object.entries(vitaminsAndMinerals)) {
        const value = nutrients[key];

        if (value && value > 0) {
            found.push(displayName);
        }
    }

    console.log(`Found ${found.length} vitamins/minerals`);
    return found;
}
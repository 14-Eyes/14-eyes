import foodz from "../config/foods";
import badStuff from "../config/badlists";

/*
    id: The unique key of the object
    label: Name
    desc: Short description of foods
    pageDesc: Longer description for the category page description
    buttonColor: Color that the button will be
    mapToo: What food category the category will link too
*/

export default {
    foodCategories: [
        {
            id: 1,
            label: "Fruits",
            desc: "Apple, Bananas, Plums, etc.",
            pageDesc: "Fruits include a whole host of important vitamins and minerals for your body, and they can be eaten raw or cooked. Listed below are commonly available and harvested fruits. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#F43545",
            mapToo: foodz.fruits,
        },
        {
            id: 2,
            label: "Vegetables",
            desc: "Broccoli, Kale, Cabbage, etc.",
            pageDesc: "Vegetables provide lots of very important vitamins and minerals for your body, and they can be eaten raw or cooked. Listed below are commonly available and harvested vegetables. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#00BA71",
            mapToo: foodz.vegetables,
        },
        {
            id: 3,
            label: "Dairy",
            desc: "Milk, Butter, Cheese, etc.",
            pageDesc: "Dairy provides many vitamins and minerals for your body, and comes in many different delicious forms. Listed below are commonly available dairy products. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#FAD717",
            mapToo: foodz.dairy,
        },
        {
            id: 4,
            label: "Legumes",
            desc: "Beans, Peas, Lentils, etc.",
            pageDesc: "Legumes provide lots of important vitamins and minerals for your body, and they can be eaten uncooked or cooked. Listed below are commonly available and harvested legumes. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#ea9c60",
            mapToo: foodz.legumes,
        },
        {
            id: 5,
            label: "Grains",
            desc: "Wheat, Corn, Rice, etc.",
            pageDesc: "Grains provide lots of important vitamins and minerals for your body, and they can be eaten uncooked or cooked. Listed below are commonly available and harvested grains. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#5F2879",
            mapToo: foodz.grains,
        },
        {
            id: 6,
            label: "Nuts",
            desc: "Almond, Cocoa, Pecan, etc.",
            pageDesc: "Nuts provide lots of important vitamins and minerals for your body, and they can be eaten uncooked or cooked. Listed below are commonly available and harvested nuts. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#F786AA",
            mapToo: foodz.nuts,
        },
                {
            id: 7,
            label: "Oils",
            desc: "Corn, Canola, Peanut Oil etc.",
            pageDesc: "When cooking with oils, they can add lots of vitamins and minerals into your food, or add to what’s already there. Listed below are commonly available oils. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#8acff4",
            mapToo: foodz.oils,
        },
        {
            id: 8,
            label: "Spices",
            desc: "Pepper, Salt, Paprika, etc.",
            pageDesc: "Adding spices to food can enhance the taste of your food, and add in vitamins and minerals to make it even better. Listed below are commonly available and harvested spices. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#F43545",
            mapToo: foodz.spices,
        },
        {
            id: 9,
            label: "Herbs",
            desc: "Basil, Mint, Thyme, etc.",
            pageDesc: "Adding herbs to food can enhance the taste of your food, and add in vitamins and minerals to make it even better. Listed below are commonly available and harvested herbs. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#00BA71",
            mapToo: foodz.herbs,
        },
        {
            id: 10,
            label: "Meats",
            desc: "Beef, Lamb, Chicken, etc.",
            pageDesc: "Meats provide lots of very important vitamins and minerals for your body, but make sure to eat them cooked to avoid parasites or illness. Listed below are commonly available and hunted meats. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#F786AA",
            mapToo: foodz.meat,
        },
        {
            id: 11,
            label: "Fish",
            desc: "Tuna, Crab, Salmon, etc.",
            pageDesc: "Fish provides lots of very important vitamins and minerals for your body, and can be eaten cooked, or if carefully prepared, raw. Listed below are commonly available and hunted fish. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#8acff4",
            mapToo: foodz.fish,
        },
        {
            id: 12,
            label: "Breads",
            desc: "Multigrain, Pita, Rye, etc.",
            pageDesc: "Bread provides many vitamins and minerals for your body, and comes in many different delicious forms. Listed below are commonly available bread products. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#FAD717",
            mapToo: foodz.breads,
        },
        {
            id: 13,
            label: "Other",
            desc: "Chocolate, Egg, Tofu, etc.",
            pageDesc: "Listed below are foods that do not fall under the other categories, but are nonetheless a great place to find vitamins and minerals for your body. To know what a certain vitamin or mineral does for your body, click on its name.",
            buttonColor: "#ea9c60",
            mapToo: foodz.other,
        },
    ],
    
    harmfulCategories: [
        {
            id: 1,
            label: "Bad Sugars",
            desc: "Syrups and Sugars",
            pageDesc: "Certain sugars are bad for your body because they spike your blood sugar and can easily be overconsumed, leading to health issues and negative effects on your body. Below are common sugars that are harmful to your body and why.",
            buttonColor: "#8acff4",
            mapToo: badStuff.badSugars,
        },
        {
            id: 2,
            label: "Preservatives",
            desc: "Synthetic Products",
            pageDesc: "Certain preservatives are bad for your body because they are usually made by artificial means, leading to health issues and negative effects on the body. Below are common preservatives and why they harm your body.",
            buttonColor: "#00BA71",
            mapToo: badStuff.preservativesChoices,
        },
        {
            id: 3,
            label: "Harmful Fats",
            desc: "Saturated Fats",
            pageDesc: "While not all fats are bad for your body, and are needed for everyday health, some fats will negatively impact your health. Below are the unhealthy fats that can be commonly found in your food, and why they harm your body.",
            buttonColor: "#F43545",
            mapToo: badStuff.harmfulFats,
        },
        {
            id: 4,
            label: "Food Dyes",
            desc: "Artificial Dyes",
            pageDesc: "Certain food dyes are bad for your body because they are usually made from synthetic chemicals that are linked to health issues, and most provide no nutrition benefits to your body. Below are common food dyes and why they harm your body.",
            buttonColor: "#FAD717",
            mapToo: badStuff.dyeChoices,
        },
    ],
};
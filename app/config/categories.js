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
            pageDesc: "This stuff is good for you!",
            buttonColor: "#F43545",
            mapToo: foodz.fruits,
        },
        {
            id: 2,
            label: "Vegetables",
            desc: "Broccoli, Kale, Cabbage, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#00BA71",
            mapToo: foodz.vegetables,
        },
        {
            id: 3,
            label: "Dairy",
            desc: "Milk, Butter, Cheese, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#FAD717",
            mapToo: foodz.dairy,
        },
        {
            id: 4,
            label: "Legumes",
            desc: "Beans, Peas, Lentils, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#ea9c60",
            mapToo: foodz.legumes,
        },
        {
            id: 5,
            label: "Grains",
            desc: "Wheat, Corn, Rice, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#5F2879",
            mapToo: foodz.grains,
        },
        {
            id: 6,
            label: "Nuts",
            desc: "Almond, Cocoa, Pecan, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#F786AA",
            mapToo: foodz.nuts,
        },
                {
            id: 7,
            label: "Oils",
            desc: "Corn Oil, Canola Oil, Vegetable Oil, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#8acff4",
            mapToo: foodz.oils,
        },
        {
            id: 8,
            label: "Spices",
            desc: "Pepper, Salt, Paprika, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#F43545",
            mapToo: foodz.spices,
        },
        {
            id: 9,
            label: "Herbs",
            desc: "Basil, Mint, Thyme, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#00BA71",
            mapToo: foodz.herbs,
        },
        {
            id: 10,
            label: "Meats",
            desc: "Beef, Lamb, Chicken, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#F786AA",
            mapToo: foodz.meat,
        },
        {
            id: 11,
            label: "Fish",
            desc: "Tuna, Crab, Salmon, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#8acff4",
            mapToo: foodz.fish,
        },
        {
            id: 12,
            label: "Breads",
            desc: "Multigrain, Gluten-free, Sourdough, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#FAD717",
            mapToo: foodz.breads,
        },
        {
            id: 13,
            label: "Other",
            desc: "Chocolate, Egg, Tofu, etc.",
            pageDesc: "This stuff is good for you!",
            buttonColor: "#ea9c60",
            mapToo: foodz.other,
        },
    ],
    
    harmfulCategories: [
        {
            id: 1,
            label: "Bad Sugars",
            desc: "Bad!! BAD!!",
            pageDesc: "No good! This stuff is nooo good.",
            buttonColor: "#8acff4",
            mapToo: badStuff.badSugars,
        },
        {
            id: 2,
            label: "Preservatives",
            desc: "Bad!! BAD!!",
            pageDesc: "No good! This stuff is nooo good.",
            buttonColor: "#00BA71",
            mapToo: badStuff.preservativesChoices,
        },
        {
            id: 3,
            label: "Harmful Fats",
            desc: "Bad!! BAD!!",
            pageDesc: "No good! This stuff is nooo good.",
            buttonColor: "#F43545",
            mapToo: badStuff.goodSugars,
        },
        {
            id: 4,
            label: "Food Dyes",
            desc: "Bad!! BAD!!",
            pageDesc: "No good! This stuff is nooo good.",
            buttonColor: "#FAD717",
            mapToo: badStuff.dyeChoices,
        },
    ],
};
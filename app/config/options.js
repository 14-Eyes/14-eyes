export default {
  allergyChoices: [
    {
      id: 1,
      label: "Soy",
    },
    {
      id: 2,
      label: "Peanuts",
    },
    {
      id: 3,
      label: "Shellfish",
    },
    {
      id: 4,
      label: "Eggs",
    },
    {
      id: 5,
      label: "Dairy",
    },
    {
      id: 6,
      label: "Wheat",
    },
    {
      id: 7,
      label: "Tree Nut",
    },
    {
      id: 8,
      label: "Sesame",
    },
    {
      id: 9,
      label: "Corn",
    },
    {
      id: 10,
      label: "Gelatin",
    },
    {
      id: 11,
      label: "Gluten",
    },
    {
      id: 12,
      label: "Red 40",
    },
    {
      id: 13,
      label: "Blue 2",
    },
    {
      id: 14,
      label: "Yellow 5",
    },
    {
      id: 15,
      label: "Yellow 6",
    },
  ],

  conditionChoices: [
    {
      id: 1,
      label: "Cancer",
      avoid: ["sucrose", "lactose", "sodium"],
      good: [
        "omega3",
        "fruits_veggies_nuts",
        "vitaminA",
        "protein",
        "calcium",
        "potassium",
        "fiber",
        "vitaminD",
        "vitaminC",
      ],
    },
    {
      id: 2,
      label: "IBS",
      avoid: ["lactose", "gluten", "sodium"],
      good: [
        "monounsaturated_fat",
        "fiber",
        "vitaminA",
        "protein",
        "vitaminC",
        "vitaminB6",
      ],
    },
    {
      id: 3,
      label: "Heart Disease",
      avoid: ["sucrose", "cholesterol", "saturated_fat", "sodium"],
      good: [
        "omega3",
        "fruits_veggies_nuts",
        "vitaminA",
        "protein",
        "calcium",
        "potassium",
        "fiber",
        "vitaminD",
        "vitaminC",
        "vitaminB6",
      ],
      goodSpicy: ["horseradish", "red pepper", "jalapeno"],
    },
    {
      id: 4,
      label: "Obesity",
      avoid: ["saturated_fat", "sodium", "gluten", "cholesterol"],
      good: [
        "fruits_veggies_nuts",
        "fiber",
        "monounsaturated_fat",
        "vitaminA",
        "vitaminC",
        "vitaminB6",
      ],
   },
   {//added ADD/ADHD to conditions
      id: 5,
      label: "ADD/ADHD",
      avoid: ["simple_carbohydrates", "sugar", "white_rice"],
      good: [
        "high_protein_foods",
        "complex_carbohydrates",
        "omega3",
        "vitaminA",
        "vitaminC",
        "vitaminB6",
        "vitaminB12",
        "vitaminD3",
        "calcium",
      ],
   },
   {//added Diabetes to conditions
     id: 6,
     label: "Diabetes",
     avoid: ["simple_carbohydrates", "complex_carbohydrates", "sugar", "saturated_fat"],
     good: [
       "fiber",
       "vitaminA",
       "vitaminB6",
       "vitaminB12",
       "vitaminC",
       "healthy_fats",
     ],
   },

  ], //

  cathyTips: [
    {
      label: "strawberry",
      color: "red",
      description:
        "Polyphenols...high antioxidants, fiber, and lowers cholesterol",
    },
    {
      label: "tomato",
      color: "red",
      description:
        "Lycopene...powerful antioxidant that fights heart disease and cancer",
    },
    {
      label: "banana",
      color: "yellow",
      description:
        "Potassium strengthens cardiovascular system, Serotonin helps manage moods and depression",
    },
    {
      label: "grapefruit",
      color: "pink",
      description:
        "Vitamin C...fights off infection and increases energy, Collagen promotes healthy skin",
    },
    {
      label: "broccoli",
      color: "green",
      description:
        "Cruciferous family...most power packed vegetable for digestion, cancer fighter, and aids in decreasing obesity, diabetes, and heart disease",
    },
    {
      label: "cabbage",
      color: "purple",
      description: "Folate...cancer fighter and helps prevent birth defects",
    },
    {
      label: "pumpkin",
      color: "orange",
      description:
        "Vitamin A...eye health hero, Lutein...antioxidant, fights cataracts",
    },
    {
      label: "blueberry",
      color: "blue",
      description:
        "Highest fruit for antioxidants (flavonoids), boosts the brain helping with memory loss, UTI prevention, cancer blocker, stops the growth of tumors",
    },
  ],
};

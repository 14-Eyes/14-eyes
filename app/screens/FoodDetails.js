import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView, Linking } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import choices from "../config/badlists"
import check from "../utility/check";
import AccountAllergies from "../screens/AccountAllergies"; //
import AccountConditions from "../screens/AccountConditions"; //
import ScanNavigator from "../navigation/ScanNavigator"; //
import Preservatives from "../screens/Preservatives"; //
import routes from "../navigation/routes";

function FoodDetails({ route }) {
  const [allergic, setAllergic] = useState(null);
  const [condition, setCondition] = useState(null);
  const food = route.params;
  const status = food.status;
  let image = false;
  let traces = false;

  if (food.status) {
    image = food.product.image_small_url;
    traces = food.product.traces;

    useEffect(() => {	// The specified function will only run at certain time
      checkAllergies();
      checkConditions();
    }, []);	// useEffect fetches data when the component mounts.
  }

  const checkAllergies = async () => {	//async function makes callback function return a promise
    const allergic = await check.checkAllergens(	//resolves promise
      food.product.ingredients_text,
      food.product.traces
    );
    setAllergic(allergic);
  };

  const checkConditions = async () => {	//async function makes callback function return a promise
    const condition = await check.checkConditions(food.product.nutriments);	//resolves promise
    setCondition(condition);
  };

  /*When a user scans an item, the following should happen in regards to ALLERGIES/CONDITIONS:
  1. retrieve the ingredient list from the item (done)
  2. retrieve the user's allergies from asyncstorage (done)
  3. check if any ingredients in the item match a user's allergies/conditions THIS SHOULD BE CASE INSENSITIVE (done)
  4. If there is a match, tell the user DO NOT EAT THIS (not done)*/

  //text messages
    var allergyText = "Warning! This product contains the allergen(s): ";
    var conditionText = "Warning! This product contains several ingredients which may conflict with your medication(s)/condition(s): ";
    var preservativesText = "";
    var dyesText = "";
    var goodSugarsText = "";
    var badSugarsText = "";

   // Retrieving allergens from asyncstorage
  const RetrieveAllergens = async () => {
  	try{
		const retAll = await AsyncStorage.getItem('retALL');
	}
	catch(err){
		var message = "We have no information on your allergies or health conditions.";
	}
 }

    const preservativesChoices = choices.preservativesChoices; //used to map preservativeChoices from badlist.js
    const dyeChoices = choices.dyeChoices; // used to map dyeChoices from badlist.js
    //const sugars = choices.sugars; // used to map sugars from badlist.js
    const goodSugars = choices.goodSugars; // used to map good sugars from badlist.js
    const badSugars = choices.badSugars; // used to map bad sugars from badlist.js
    

    var thumbs_up_down; // thumps up/down image holder

    var thumbs_up_img = // thumbs up var
    <Image source={require('../assets/thumbs-up.png')}
    style={{
      height: 250,
      width: 250,
      borderColor: colors.primary,
      borderWidth: 8,
      marginBottom: 20,
    }}
    />
    var thumbs_down_img = //thumbs down var
    <Image source={require('../assets/thumbs-down.png')}
    style={{
      height: 250,
      width: 250,
      borderColor: colors.primary,
      borderWidth: 8,
      marginBottom: 20,
    }}
    />
    
    {preservativesChoices.map(preservative => ( // mapping each preservative to run comparison with ingredients list
			<AppText key={preservative.id}></AppText>
        //, preservative.label}></AppText>
          ))}
    
    {dyeChoices.map(dye => ( // mapping each dye to run comparison with ingredients list
      <AppText key={dye.id}></AppText>
        //, dye.label}></AppText>
          ))}

    /*{sugars.map(sugar => ( // mapping each sugar to run comparison with ingredients list
      <AppText style={styles.text} key={sugar.id, sugar.label}></AppText>
          ))}*/

    {goodSugars.map(sugar => ( // mapping each good sugar to run comparison for thumbs up/down
      <AppText key={sugar.id}></AppText>
        //, sugar.label}></AppText>
          ))}
          
    {badSugars.map(sugar => ( // mapping each bad sugar to run comparison for thumbs up/down
      <AppText key={sugar.id}></AppText>
        //, sugar.label}></AppText>
          ))}    
          
      if (food.status == 0)
      {
        //do nothing
      }
      else if (food.product.ingredients_text == null)
      {
        food.product.ingredients_text = "No Ingredients Found."
      }
      else                  //if(food.product.ingredients_text != null) // if the ingredients list returns NOT empty
      {
        let food_text = food.product.ingredients_text;

        // loop through all the preservatives
        for (let j = 0; j < preservativesChoices.length; j++)
        {
          let preservative_result = food_text.includes(preservativesChoices[j].label.toLowerCase()); // includes() returns true/false and is case-sensitive, ingredients_text is converted to lowercase in another function. loops through preservativeChoice map array
          if (preservative_result)
          {
            if (preservativesText.includes(preservativesChoices[j].label)) // if preservativeText already includes the current label, continue
            {
              continue;
            }
            else
            {
              preservativesText += preservativesChoices[j].label; // append the matching label to preservativeText
              preservativesText += ", "; // append a comma after each label to make the list nice
            }
          }
        }

        // loop through all the food dyes
        for (let k = 0; k < dyeChoices.length; k++)
        {
          let dye_result = food_text.includes(dyeChoices[k].label.toLowerCase()); // includes() returns true/false and is case-sensitive, ingredients_text is converted to lowercase in another function. loops through dyeChoice map array
          if (dye_result)
          {
            if (dyesText.includes(dyeChoices[k].label))// if dyesText already includes the current label, continue
            {
              continue;
            }
            else
            {
              dyesText += dyeChoices[k].label; // append the matching label to dyesText
              dyesText += ", "; // append a comma after each label to make the list nice
            }
          }
        }

      // ALL OF THE IF-ELSE IF BLOCKS BELOW (UP TO THE SUGARS LOOPS) ARE TO CATCH ANY VARIATIONS OF
      // FOOD DYES ENTERED PUBLICLY ON THE US OPEN FOOD FACTS WEBSITE THE SCANNER API IS CONNECTED TO.
      // ANYBODY THAT CREATES AN ACCOUNT FOR THE SITE CAN INPUT INFORMATION, I.E. INGREDIENTS SO ALL 
      // ITEMS' INGREDIENTS LIST/INPUT DRAWN FROM THE WEBSITE VARY
      
      // THESE ARRAYS HOLD THE ACCEPTABLE VARIATIONS OF THE FOOD DYES
      // MUST BE LOWERCASE TO MATCH LOWERCASED INGREDIENTS LIST
      // PLEASE FEEL FREE TO LOOK INTO BUILDING A REGULAR EXPRESSION TO CHECK THESE DYES FOR LESS LINES OF CODE

      const citrus_red_2_array = ["red 2", "red 2 lake", "red no. 2", "citrus red 2", "citrus red no 2"];
      const blue_1_array = ["blue 1", "blue 1 lake", "blue no. 1", "blue no 1"];
      const blue_2_array = ["blue 2", "blue 2 lake", "blue no. 2", "blue no 2"];
      const green_3_array = ["green 3", "green 3 lake", "green no. 3", "green no 3"];
      const red_3_array = ["red 3", "red 3 lake", "red no. 3", "red no 3"];
      const red_40_array = ["red 40", "red 40 lake", "red no. 40", "red no 40"];
      const yellow_5_array = ["yellow 5", "yellow 5 lake", "yellow no. 5", "yellow no 5"];
      const yellow_6_array = ["yellow 6", "yellow 6 lake", "yellow no. 6", "yellow no 6"];
      const orange_b_array = ["orangeb", "orange b lake", "orange-b"];
      
      if(dyesText.includes("Citrus Red No. 2"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < citrus_red_2_array.length; c++)
        {
          if(food.product.ingredients_text.includes(citrus_red_2_array[c]))
          {
            if(dyesText.includes("Citrus Red No. 2, "))
            {
             // Do not duplicately add it due to red 2 and red 2 lake variation
            }
            else
            {
              dyesText += "Citrus Red No. 2, ";
            }
          }
        }
      }

      if(dyesText.includes("FD&C Blue No. 1"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < blue_1_array.length; c++)
        {
          if(food.product.ingredients_text.includes(blue_1_array[c]))
          {
            if(dyesText.includes("FD&C Blue No. 1, "))
            {
             // Do not duplicately add it due to blue 1 and blue 1 lake variation
            }
            else
            {
              dyesText += "FD&C Blue No. 1, ";
            }
          }
        }
      }

      if(dyesText.includes("FD&C Blue No. 2"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < blue_2_array.length; c++)
        {
          if(food.product.ingredients_text.includes(blue_2_array[c]))
          {
            if(dyesText.includes("FD&C Blue No. 2, "))
            {
             // Do not duplicately add it due to blue 2 and blue 2 lake variation
            }
            else
            {
              dyesText += "FD&C Blue No. 2, ";
            }
          }  
        }
      }

      if(dyesText.includes("FD&C Green No. 3"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < green_3_array.length; c++)
        {
          if(food.product.ingredients_text.includes(green_3_array[c]))
          {
            if(dyesText.includes("FD&C Green No. 3, "))
            {
             // Do not duplicately add it due to green 3 and green 3 lake variation
            }
            else
            {
              dyesText += "FD&C Green No. 3, ";
            }            
          }
        }
      }
      
      if(dyesText.includes("FD&C Red No. 3"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < red_3_array.length; c++)
        {
          if(food.product.ingredients_text.includes(red_3_array[c]))
          {
            if(dyesText.includes("FD&C Red No. 3, "))
            {
             // Do not duplicately add it due to red 3 and red 3 lake variation
            }
            else
            {
              dyesText += "FD&C Red No. 3, ";
            }            
          }
        }
      }

      if(dyesText.includes("FD&C Red No. 40"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < red_40_array.length; c++)
        {
          if(food.product.ingredients_text.includes(red_40_array[c]))
          {
            if(dyesText.includes("FD&C Red No. 40, "))
            {
             // Do not duplicately add it due to red 40 and red 40 lake variation
            }
            else
            {
              dyesText += "FD&C Red No. 40, ";
            }            
          }
        }
      }

      if(dyesText.includes("FD&C Yellow No. 5"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < yellow_5_array.length; c++)
        {
          if(food.product.ingredients_text.includes(yellow_5_array[c]))
          {
            if(dyesText.includes("FD&C Yellow No. 5, "))
            {
             // Do not duplicately add it due to yellow 5 and yellow 5 lake variation
            }
            else
            {
              dyesText += "FD&C Yellow No. 5, ";
            }            
          }
        }
      }

      if(dyesText.includes("FD&C Yellow No. 6"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < yellow_6_array.length; c++)
        {
          if(food.product.ingredients_text.includes(yellow_6_array[c]))
          {
            if(dyesText.includes("FD&C Yellow No. 6, "))
            {
             // Do not duplicately add it due to yellow 6 and yellow 6 lake variation
            }
            else
            {
              dyesText += "FD&C Yellow No. 6, ";
            }            
          }
        }
      }

      if(dyesText.includes("Orange B"))
      {
        // Do not duplicately add it
      }
      else
      {
        for (let c = 0; c < orange_b_array.length; c++)
        {
          if(food.product.ingredients_text.includes(orange_b_array[c]))
          {
            if(dyesText.includes("Orange B, "))
            {
             // Do not duplicately add it due to orange b and orange b lake variation
            }
            else
            {
              dyesText += "Orange B, ";
            }            
          }
        }
      }
      
        for (let l = 0; l < goodSugars.length; l++) // loop through the good sugars
        {
          let good_sugar_result = food_text.includes(goodSugars[l].label.toLowerCase()); // includes() returns true/false and is case-sensitive, ingredients_text is converted to lowercase in another function. loops through goodSugars map array
          if (good_sugar_result)
          {
            if (goodSugarsText.includes(goodSugars[l].label + ", "))// if goodSugarsText already includes the current label, continue
            {
              continue;
            }
            else
            {
              goodSugarsText += goodSugars[l].label; // append the matching label to goodSugarsText
              goodSugarsText += ", "; // append a comma after each label to make the list nice
            }
          }
        }

        for (let m = 0; m < badSugars.length; m++) // loop through the bad sugars
        {
          let bad_sugar_result = food_text.includes(badSugars[m].label.toLowerCase()); // includes() returns true/false and is case-sensitive, ingredients_text is converted to lowercase in another function. loops through badSugars map array
          if (bad_sugar_result)
          {
            if (badSugarsText.includes(badSugars[m].label + ", "))// if badSugarsText already includes the current label, continue
            {
              continue;
            }
            else
            {
              badSugarsText += badSugars[m].label; // append the matching label to badSugarsText
              badSugarsText += ", "; // append a comma after each label to make the list nice
            }
          }
        }
        
        if (badSugarsText.includes("High fructose corn syrup, ")) // extra check so corn syrup does not duplicately show with high fructose corn syrup
        {
          badSugarsText = badSugarsText.replace("Corn syrup, ", ""); // replace corn syrup with empty string so it does not show
        }

    if (preservativesText.length == 0)
    {
      preservativesText = "No preservatives found.";
    }

    if (dyesText.length == 0)
    {
      dyesText += "No food dyes found.";
    }

    if (goodSugarsText.length == 0)
    {
      goodSugarsText += "No good sugars found.";
    }

    if (badSugarsText.length == 0)
    {
      badSugarsText += "No bad sugars found.";
    }

    preservativesText = preservativesText.replace(/,\s*$/, "."); // replaces last comma in preservativesText with .
    dyesText = dyesText.replace(/,\s*$/, "."); // replaces last comma in dyesText list with .
    goodSugarsText = goodSugarsText.replace(/,\s*$/, "."); // replaces last comma in goodSugar list with .
    badSugarsText = badSugarsText.replace(/,\s*$/, "."); // replaces last comma in badSugar list with .
    food.product.ingredients_text = food.product.ingredients_text.replace(/,\s*$/, "."); // replaces last comma in ingredients list with .

  // setting a thumbs up or down on ingredient / scan screen
  if (allergic)
  {
    thumbs_up_down = thumbs_down_img;
  }
  else if (food.product.nutriments.sugars_100g > 11) // 11
  {
    //console.log("thumbs down for sugars");
    thumbs_up_down = thumbs_down_img;
  }
  else if (food.product.nutriments.sodium_100g > 0.380) // 0.380
  {
    //console.log("thumbs down for sodium")
    thumbs_up_down = thumbs_down_img;
  }
  else if (condition)
  {
    thumbs_up_down = thumbs_down_img;
  }
  else if (preservativesText != "No preservatives found.")
  {
    thumbs_up_down = thumbs_down_img;
  }
  else if (dyesText != "No food dyes found.")
  {
    thumbs_up_down = thumbs_down_img;
  }
  else if (badSugarsText != "No bad sugars found.")
  {
    thumbs_up_down = thumbs_down_img;
  }
  else
  {
    thumbs_up_down = thumbs_up_img;
  }
} 

/*if (food.product.nutriments.sugars_100g > 0) // 11
{
  console.log("thumbs down for sugars");
  console.log(food.product.nutriments.sugars_100g);
  thumbs_up_down = thumbs_down_img;
}
else
{
  console.log("Caught nothing");
}

if (food.product.nutriments.sodium_100g > 0) // 0.380
{
  console.log("thumbs down for sodium");
  console.log(food.product.nutriments.sodium_100g);
  //thumbs_up_down = thumbs_down_img;
}
else
{
  console.log("Caught nothing");
}*/


// what's showing on the screen
  return (
    <ScrollView style={styles.scroll}>
      <Screen style={styles.foodContainer}>
        {image ? (
          <Image
            source={{ uri: food.product.image_small_url }}
            style={{
              height: 250,
              width: 250,
              borderColor: colors.primary,
              borderWidth: 8,
              marginBottom: 20,
            }}
          />
        ) : (
          <AppText style={styles.noImage}>
            Sorry, we couldn't find an image for this product on us.openfoodfacts.org!
          </AppText>
        )}

        <View style={styles.foodInfo}>
          {status ? (
              <AppText style={styles.Name}>{food.product.product_name}</AppText>
          ) : (
            <>
              <AppText style={styles.noItem}>
              Sorry, we could't find that item on <AppText style={styles.noItemLink} onPress={() => Linking.openURL('https://us.openfoodfacts.org/')}>https://us.openfoodfacts.org/</AppText>!
              </AppText>
              <View style = {styles.characterContainer}>           
              <Image
                style={styles.speechBubble}
                source={require('../assets/speech-bubble-2.png')}
              />

              <AppText style={styles.speechbubbleText}>
              {"       "}Sorry 'bout that!{"\n"}Please, try another item!
              </AppText>

              <Image
              style={styles.apple}
              source={require("../assets/tomato.png")}/>
              </View>
            </>
          )}
          {allergic ? (
            <>
              <AppText style={styles.Warn}>
                Warning! You are allergic to the following ingredients in this
                food:
              </AppText>
              <AppText>{allergic}{"\n"}</AppText>
            </>
          ) : null}
          {condition ? (
            <>
              <AppText style={styles.Warn}>Warning! The following ingredients may affect your condition(s):</AppText>
              <AppText>{condition}{"\n"}</AppText>
            </>
          ) : null}
          {traces ? (
            <>
              <AppText style={styles.Warn}>May also contain traces of:</AppText>
              <AppText style={styles.text}>{food.product.traces}.</AppText>
            </>
          ) : null}
          {status && food.product.ingredients_text ? (
            <>
              <View>{thumbs_up_down}</View>
              <AppText style={styles.Warn}>{"\n"}Ingredients: </AppText>
              <AppText>{food.product.ingredients_text}{"\n"}</AppText>
              <AppText style={styles.Warn}>Preservatives found: </AppText>
              <AppText>{preservativesText}{"\n"}</AppText>
              <AppText style={styles.Warn}>Food Dyes found: </AppText>
              <AppText>{dyesText}{"\n"}</AppText>
              <AppText style={styles.Warn}>Good sugars found: </AppText>
              <AppText>{goodSugarsText}{"\n"}</AppText>
              <AppText style={styles.Warn}>Bad sugars found: </AppText>
              <AppText>{badSugarsText}{"\n"}</AppText>
              <AppText style={styles.footNoteInfo}>{"\n\n\n\n\n"}Information retrieved from {"\n"}</AppText>
              <AppText style={styles.footNoteLink} onPress={() => Linking.openURL('https://us.openfoodfacts.org/')}>https://us.openfoodfacts.org/</AppText>
            </>
          ) : null}
        </View>
      </Screen>
    </ScrollView>
  );
}
// How content is being displayed
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.light,
  },
  foodContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  foodInfo: {
    padding: 15,
  },
  Name: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
  },
  Warn: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.eltrred,
  },
  text: {
    fontSize: 18,
    paddingBottom: 20,
  },
  noImage: {
    fontSize: 10,
    color: colors.eltrgreen,
  },
  noItem: {
    fontSize: 10,
  },
  thumbsUpDown: {
      height: 250,
      width: 250,
      borderColor: colors.primary,
      borderWidth: 8,
      marginBottom: 20,
  },
  apple: {
    width: 220,
    height: 150,
    left: 50,
  },
  characterContainer: {
    flexDirection: "column",
  },
  speechBubble: {
    marginBottom: 10,
    width: 175,
    height: 175,
    top: 55,
    left: 15,
    alignSelf: "flex-start",
  },
  speechbubbleText: {
    lineHeight: 15,
    fontSize: 11.25,
    alignContent: "center",
    left: 30,   
    bottom: 75,
    fontWeight: "bold",
  },
  footNoteInfo: {
    justifyContent: "center", 
    fontSize: 13, 
    fontWeight: "bold",
    bottom: 15, 
    color: colors.eltrdarkblue,
  },
  footNoteLink: {
    justifyContent: "center", 
    fontSize: 13, 
    fontWeight: "bold", 
    bottom: 37,
    color: colors.eltrdarkblue,
    textDecorationLine: "underline"
  },
  noItemLink: {
    justifyContent: "center", 
    fontSize: 10, 
    fontWeight: "bold", 
    bottom: 37,
    color: colors.eltrdarkblue,
    textDecorationLine: "underline"
  }
});

export default FoodDetails;

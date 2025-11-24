///////////////////////////////////////////////////////////
/* COMPLETELY REWRITTEN CODE - ONLY FOR CONDITIONS LOGIC */

/* !!! SEE FoodDetailsOld.js FOR OLD CODE !!! */

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import any other service functions here (for allergies, diet, preservatives, etc.)
import { checkConditions } from "../services/conditionsService";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";

function FoodDetails({ route }) {
  const food = route.params; // stores scanned result from Open Food Facts inside "food"; 1 if exists, 0 if not

  // read user's conditions and the list of all possible conditions from firebase
  const db = getFirestore();
  const auth = getAuth();

  const [loading, setLoading] = useState(true); // store the loading state of the food item info
  
  // arrays to store the results of any ingredient matches FOR CONDITIONS
  const [conditionMatches, setConditionMatches] = useState({
    good: [],
    avoid: [],
  });

  // could add other arrays to store allergies/diet matches, or could try to combine with the above arrays
  // my first thought is probably to try adding separate arrays?

  const [productNotFound, setProductNotFound] = useState(false); // flag to identify if product does not exist on Open Food Facts; become true if DNE
  
  // stores basic product info in the case that product does exist on Open Food Facts
  const [product, setProduct] = useState({
    name: "",
    image: "",
    ingredients: "",
  });

  // -------------------------------------------------
  // CHECK TO SEE IF BARCODE EXISTS IN OPEN FOOD FACTS
  // if so, store food image, name, and ingredients list
  // this can be reused for allergies and diet checking
  // -------------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        
        // Check if product does not exist on Open Food Facts
        if (food?.status === 0 || !food?.product) {
          setProductNotFound(true);
          setLoading(false);
          return; // exit function and do not process ingredients if product DNE
        }
        
        // Save product info from Open Food Facts (try to save in english as default language)
        const ingredients =
          food?.product?.ingredients_text_en || // default to english text
          food?.product?.ingredients_text ||    // if no eng, read default language text
          "";                                   // default to empty 

        const productName = 
          food?.product?.product_name_en ||     // english name
          food?.product?.generic_name_en ||     // english generic name
          food?.product?.product_name ||        // default language
          food?.product?.generic_name ||        // default language generic
          "Unknown Product Name";

        setProduct({
          name: productName,
          image: food?.product?.image_small_url || null,
          ingredients: ingredients,                         // default to empty 
        });

        // Debug to see full ingredients list pulled from Open Food Facts in terminal
        console.log("INGREDIENTS RAW TEXT:", ingredients);

        // Run condition checking function if ingredients exist (located below)
        // Probably add the checks for allegies and diet here as well
        if (ingredients) {
          // await checkConditions(ingredients);
          const condResults = await checkConditions(ingredients);
          if (condResults) {
            setConditionMatches(condResults);
          }
        }
      } catch (err) {
        console.log("Error loading food details:", err); // error handling
      } finally {
        setLoading(false); // stop showing loading icon after ingredient scan is complete
      }
    };

    load();
  }, []);

  
  // -----------------------------
  // FOLLOWING IS ALL UI
  // -----------------------------

  // ------ LOADING DISPLAY ------
  if (loading) {
    return (
      <Screen style={styles.loadingMsg}>
        <ActivityIndicator size="large" />
        <AppText>Analyzing ingredients…</AppText>
      </Screen>
    );
  }
  // -----------------------------

  // ------ NO PRODUCT FOUND -----
  if (productNotFound) {
    return (
      <Screen style={{ alignItems: "center", padding: 20 }}>
        <AppText style={styles.noItem}>
          Sorry, we couldn't find that item on{" "}
          <AppText 
            style={styles.noItemLink} 
            onPress={() => Linking.openURL('https://us.openfoodfacts.org/')}
          >
            https://us.openfoodfacts.org/
          </AppText>
          !
        </AppText>

        <View style={styles.characterContainer}>
          <Image
            style={styles.speechBubble}
            source={require("../assets/speech-bubble-2.png")}
          />

          <AppText style={styles.speechbubbleText}>
            {"       "}Sorry 'bout that!{"\n"}Please, try another item!
          </AppText>

          <Image
            style={styles.apple}
            source={require("../assets/tomato.png")}
          />
        </View>
      </Screen>
    );
  }
  // -----------------------------

  // Set isBad & isGood booleans to determine thumbs up/down image
  const isBad = conditionMatches.avoid.length > 0;
  const isGood = !isBad && conditionMatches.good.length > 0;

  // ------ SCREEN DISPLAY ------
  if (!productNotFound) {
    return (
      <ScrollView style={styles.scroll}>
        <Screen style={styles.foodContainer}>

          {/* PRODUCT IMAGE */}
          {product.image ? (
            <Image 
              source={{ uri: product.image }}
              style={styles.image} 
            />
          ) : (
            <AppText style={styles.noImage}>
              Sorry, we couldn't find an image for this product on us.openfoodfacts.org!
            </AppText>
          )}

          {/* PRODUCT NAME */}
          <AppText style={styles.title}>{product.name}</AppText>

          {/* THUMBS DOWN IMAGE - shows if ANY avoid ingredient found */}
          {isBad && (
            <View style={{ marginTop: 15 }}>
              <Image
                source={require("../assets/thumbs-down.png")}
                style={styles.thumbs}
              />
            </View>
          )}
            
          {/* THUMBS UP IMAGE - shows only if ANY good ingredient found & NO bad ingredients found */}
          {isGood && (
            <View style={{ marginTop: 15 }}>
              <Image
                source={require("../assets/thumbs-up.png")}
                style={styles.thumbs}
              />
            </View>
          )}

          {/* FOOD INFO SECTION - separated from images + title */}
          <View style={styles.foodInfo}>

            {/* AVOID LIST */}
            {conditionMatches.avoid.length > 0 && ( // display only if at least 1 bad ingredient found
              <>
                <AppText style={styles.badHeader}>Potential Harmful Ingredients Found</AppText>
                {conditionMatches.avoid.map((item, i) => (
                  <AppText key={i} style={styles.bullet}>• {item}</AppText>
                ))}
              </>
            )}

            {/* GOOD LIST */}
            {conditionMatches.good.length > 0 && ( // display only if at least 1 good ingredient found
              <>
                <AppText style={styles.goodHeader}>Potential Helpful Ingredients Found</AppText>
                {conditionMatches.good.map((item, i) => (
                  <AppText key={i} style={styles.bullet}>• {item}</AppText>
                ))}
              </>
            )}

            {/* NO CONDITION RELATED INGREDIENTS FOUND */}
            {conditionMatches.avoid.length === 0 && conditionMatches.good.length === 0 && (
              <AppText style={styles.noneFound}>
                No condition-related ingredients detected.
                {"\n"}We cannot determine if this food is good or bad.
              </AppText>
            )}

          </View>
        </Screen>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.light,
  },
  foodContainer: { 
    alignItems: "center", 
    paddingBottom: 40,
  },
  loadingMsg: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
  },
  // ----- NO ITEM FOUND STYLES -----
  noItem: {
    textAlign: "center", 
    fontSize: 20,
    marginTop: 30,
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
    left: 9,
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
  noItemLink: {
    justifyContent: "center", 
    fontSize: 20, 
    fontWeight: "bold", 
    bottom: 37,
    color: colors.eltrdarkblue,
    textDecorationLine: "underline"
  },
  // --------------------------------
  image: {
    height: 250,
    width: 250,
    borderColor: colors.primary,
    borderWidth: 6,
    borderRadius: 12,
    marginTop: 20,
  },
  noImage: { 
    marginTop: 20, 
    color: colors.medium, 
    fontSize: 16, 
    textAlign: "center", 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginTop: 15,
    textAlign: "center",
  },
  thumbs: {
    height: 180,
    width: 180,
    borderColor: colors.primary,
    borderWidth: 6,
    borderRadius: 10,
  },
  foodInfo: { 
    width: "85%", 
    marginTop: 20, 
  },
  badHeader: { 
    fontSize: 20, 
    color: colors.eltrred, 
    fontWeight: "bold", 
    marginTop: 20, 
    marginBottom: 10, 
  },
  goodHeader: { 
    fontSize: 20, 
    color: colors.eltrgreen, 
    fontWeight: "bold", 
    marginTop: 20, 
    marginBottom: 10, 
  },
  bullet: { 
    fontSize: 18, 
    marginLeft: 10, 
    marginVertical: 2, 
  },
  noneFound: { 
    marginTop: 10, 
    color: colors.medium, 
    fontSize: 16, 
    textAlign: "center", 
  },
});

export default FoodDetails;
///////////////////////////////////////////////////////////

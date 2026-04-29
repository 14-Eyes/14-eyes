import React, { useCallback, useState, useContext } from "react";
import { StyleSheet, View, Platform, ScrollView, TouchableOpacity, Image, Text } from "react-native";

import AuthContext from "../../auth/context";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import ChildBackButton from "../../components/ChildBackButton";
import { childRecipes } from "../../config/recipes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

function ChildRecipes({ navigation }) {
  const [unlockedRecipes, setUnlockedRecipes] = useState([]);
  const authContext = useContext(AuthContext);
  const userId = authContext.user?.uid;

  useFocusEffect(
    useCallback(() => {
      loadUnlockedRecipes();
    }, [])
  );

  const loadUnlockedRecipes = async () => {
    const saved = await AsyncStorage.getItem(
      `unlockedRecipes_${userId}`
    );

    if (saved) {
      setUnlockedRecipes(JSON.parse(saved));
    }
  };

  return (
    <Screen backgroundColor={colors.eltrlightblue} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.backButton}>
          <ChildBackButton
              title="<<   GO BACK"
              height="50"
              onPress={() => navigation.goBack()} // adding goBack() makes screen slide from left to right
          />
        </View>

        <AppText style={styles.headerText}>
          Your Recipes
        </AppText>
        <AppText style={styles.text}>
          These are all of the fun recipes that the mascots have given you along your journey! Click on the pictures to see how to make these delicious secret snacks!
        </AppText>

        <View style={styles.recipes}>
          {childRecipes.map((recipe) => {
            const unlocked = unlockedRecipes.includes(recipe.id);

            return (
              <View key={recipe.id} style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  disabled={!unlocked}
                  onPress={() =>
                    navigation.navigate("ChildRecipesSubScreen", {
                      childRecipesId: recipe.id,
                    })
                  }
                >
                  <Image source={recipe.image} style={styles.image} />

                  {!unlocked && (
                    <View style={styles.lockOverlay}>
                      <Text style={styles.lockText}>🔒 Locked</Text>
                    </View>
                  )}

                  {unlocked && (
                    <View style={styles.textContainer}>
                      <Text style={styles.buttonText}>
                        {recipe.title}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View> 
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.eltrlightblue,
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
  },
  headerText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
  },
  text: {
    color: colors.black,
    fontSize: 21,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  lockText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  recipes: {
    width: "85%",
    alignSelf: "center",
    // marginTop: 170,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    height: 155,
    borderRadius: 35,
    overflow: "hidden",
    marginVertical: 5,
    justifyContent: "center",

    // iOS Shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // Android Elevation property
    elevation: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  textContainer: {
    paddingHorizontal: 37,
  },
  buttonText: {
    fontSize: 32,
    textAlign: "center",
    color: colors.white,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  subText: {
    color: colors.black,
    fontStyle: "italic",
    fontSize: 17,
    textAlign: "center",
  },
});

export default ChildRecipes;
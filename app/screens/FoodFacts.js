//importing all the necessary items

import React from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import options from "../config/funfact";

// array to map each character to a funfact
// probably move this to a file under the config folder later??
const characters = [
  {
    id: 1,
    name: "Adam Apple's Facts:",
    image: require("../assets/adamapple.png"),
    facts: [13], //funfacts
    color: colors.apple,
  },
  {
    id: 2,
    name: "Toddy Tomato's Facts:",
    image: require("../assets/tomato.png"),
    facts: [5, 9, 10], //funfacts
    color: colors.tomato,
  },
  {
    id: 3,
    name: "Nika-Queen of The Nuts' Facts:",
    image: require("../assets/nut.png"),
    facts: [7], //funfacts
    color: colors.nut,
  },
  {
    id: 4,
    name: "MuMu Mushroom's Facts:",
    image: require("../assets/mushroom.png"),
    facts: [14], //funfacts
    color: colors.mushroom,
  },
  {
    id: 5,
    name: "Garman Grape's Facts:",
    image: require("../assets/grape.png"),
    facts: [2], //funfacts
    color: colors.grape,
  },
  {
    id: 6,
    name: "Lazarus the Lime's Facts:",
    image: require("../assets/lime.png"),
    facts: [18], //funfacts
    color: colors.lime,
  },
  {
    id: 7,
    name: "Lulu Lemon's Facts:",
    image: require("../assets/lemon.png"),
    facts: [16], //funfacts
    color: colors.lemon,
  },
  {
    id: 8,
    name: "Big-a-Bee's Facts:",
    image: require("../assets/bee.png"),
    facts: [1, 23], //funfacts
    color: colors.bee,
  },
]


function FoodFacts() {
  return (
    <Screen style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.title}>Fun Food Facts!</AppText>
        {/* <AppText style={styles.italic}>Probably put good fats and good sugars here eventually</AppText> */}
            
        {characters.map((character) => {
          const selectedFacts = options.funfact.filter((fact) =>
            character.facts.includes(fact.id)
        );

        // debugging:
        // console.log(options.funfact);
        // console.log(character.name, selectedFacts);

          return (
            <View key={character.id} style={styles.row}>
              {/* CHARACTER IMAGE */}
              <Image source={character.image} style={styles.image} />

              {/* CHARACTER NAME & FUN FACTS TEXT */}
              <View style={styles.textContainer}>
                <AppText style={[styles.characterName,{ color: character.color }]}>
                  {character.name}
                </AppText>

                {selectedFacts.map((fact) => (
                  <AppText key={fact.id} style={styles.factText}>
                    {fact.label}
                  </AppText>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
  },
  scrollContent: {
    paddingTop: 10,      // adds space under header before text
    paddingHorizontal: 15,
    paddingBottom: 50,  // ensures content is above bottom nav bar
    alignItems: "center",
  },
  title: {
    color: colors.buttonpink,
    fontSize: 40,
    marginBottom: 45,
    marginTop: 0,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  factText: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.black,
  },
});

//exporting the function

export default FoodFacts;
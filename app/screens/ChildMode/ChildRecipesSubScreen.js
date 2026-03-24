import React from "react";
import { useEvent } from 'expo';
import { StyleSheet, View, Platform, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import routes from "../../navigation/routes";
import ChildBackButton from "../../components/ChildBackButton";
import { childRecipes } from "../../config/recipes";

function ChildRecipesSubScreen({ route, navigation }) {
  const { childRecipesId } = route.params;
  const recipe = childRecipes.find((r) => r.id === childRecipesId);

  const player = useVideoPlayer(
    recipe.video,
    (player) => {
      player.loop = true;
      player.pause();
    }
  );

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  // backup failsafe
  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Error: Recipe not found.</Text>
      </View>
    );
  }

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
          {recipe.title}
        </AppText>

        <Image source={recipe.image} style={styles.image} />

        <AppText style={styles.sectionTitle}>INGREDIENTS</AppText>
        {recipe.ingredients.map((ingredient, index) => (
          <AppText key={index} style={styles.ingredientText}>
            • {ingredient}
          </AppText>
        ))}

        <AppText style={styles.sectionTitle}>HOW TO MAKE</AppText>
        <AppText style={styles.text}>
          {recipe.description}
        </AppText>

        <VideoView
          style={styles.video}
          player={player}
        />

        {/* this is the code for the Figma design */}
        {/* I made this before looking at how Cathy sent her recipes :') */}
        {/* <AppText style={styles.text}>
          {recipe.description}
        </AppText>

        {recipe.instructions.map((instruction, index) => (
          <View key={index} style={styles.stepContainer}>
            
            <AppText style={styles.stepTitle}>
              STEP {index + 1}
            </AppText>

            <Image source={recipe.image} style={styles.stepImage} />

            <AppText style={styles.stepText}>
              {instruction}
            </AppText>

          </View>
        ))} */}

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: "75%",
    height: 250,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  video: {
    width: "60%",
    height: 400, // fixed height avoids flex issues
    backgroundColor: colors.eltrdarkblue,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: colors.eltrdarkblue,
    marginBottom: 10,
  },
  sectionTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 20,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 6,
  },

  // styles for the old Figma design:
  // if you want to use, comment out the above three styles and uncomment these

  // stepContainer: {
  //   marginBottom: 30,
  //   alignItems: "center",
  // },
  // stepTitle: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },
  // stepImage: {
  //   width: "75%",
  //   height: 180,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  // stepText: {
  //   fontSize: 20,
  //   textAlign: "center",
  //   marginHorizontal: 20,
  // },
});

export default ChildRecipesSubScreen;
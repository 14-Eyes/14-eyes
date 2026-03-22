import React, { useState } from "react";
import { View, StyleSheet, Linking, Pressable } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NUTRI_SCORE = {
  a: {
    label: "Nutri-Score: A",
    title: "Best nutritional quality",
    color: "#00803d",
    background: "#E8F5E9",
  },
  b: {
    label: "Nutri-Score: B",
    title: "Good nutritional quality",
    color: "#87bd25",
    background: "#f4fee0",
  },
  c: {
    label: "Nutri-Score: C",
    title: "Moderate nutritional quality",
    color: "#ffcc00",
    background: "#FFFDE7",
  },
  d: {
    label: "Nutri-Score: D",
    title: "Poor nutritional quality",
    color: "#ef7d00",
    background: "#FFF3E0",
  },
  e: {
    label: "Nutri-Score: E",
    title: "Worst nutritional quality",
    color: "#e63312",
    background: "#FDECEA",
  },
};

function NutriScoreMarker({ nutriScore }) {
  const [showInfo, setShowInfo] = useState(false);

  if (!nutriScore || !NUTRI_SCORE[nutriScore]) return null;

  const score = NUTRI_SCORE[nutriScore];

  return (
    <View style={styles.container}>
      {/* Info Button - only shows if food item has nutri score */}
      <Pressable
        onPress={() => setShowInfo(prev => !prev)}
        style={[
          styles.badge,
          { backgroundColor: score.background, borderColor: score.color },
        ]}
      >        
        <AppText style={[styles.badgeText, { color: score.color }]}>
          {score.label}
        </AppText>

        <AppText style={styles.infoButton}>
          <MaterialCommunityIcons
            name="information-outline"
            size={25}
            color={colors.black}
            style={styles.icon}
          />
        </AppText>
      </Pressable>

      {/* Expanded Info Box - shown if Info Button is pressed */}
      {showInfo && (
        <View style={[styles.infoBox, { backgroundColor: score.background }]}>
          <AppText style={styles.titleText}>{score.title}</AppText>
          <AppText style={styles.infoText}>
            {"The score from A to E is calculated based on nutrients and foods to favor (proteins, fiber, fruits, vegetables and legumes ...) and nutrients to limit (calories, saturated fat, sugars, salt). The score is calculated from the data of the nutrition facts table and the composition data (fruits, vegetables and legumes)."}
            {"\n\n"}
            <AppText style={styles.italicText}>
                Classification based on the Nutri-Score system used by Open Food Facts.
            </AppText>
          </AppText>

          <AppText
            style={styles.learnMore}
            onPress={() =>
              Linking.openURL("https://world.openfoodfacts.org/nutriscore")
            }
          >
            Learn more 
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: "70%",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  infoButton: {
    marginLeft: 8,
    alignItems: "center",
  },
  infoBox: {
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.dark,
  },
  infoText: {
    fontSize: 16,
    color: colors.dark,
  },
  italicText: {
    fontSize: 16,
    color: colors.dark,
    fontStyle: 'italic',
  },
  learnMore: {
    marginTop: 6,
    fontSize: 15,
    color: colors.eltrdarkblue,
    fontWeight: "bold",
  },
});

export default NutriScoreMarker;
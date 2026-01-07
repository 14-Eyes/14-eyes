// Component used in FoodDetails.js to display each list of matched ingredients
// per condition/allergy/diet consistently

import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

export default function FoodMatchInfo({ foundFoodInfo }) {
  const isBad = foundFoodInfo.severity === "bad";

  return (
    <View
      style={[ styles.info ]}
    >

      <AppText style={styles.subtitle}>This food may contain:</AppText>

      {foundFoodInfo.ingredients.map((item, i) => (
        <AppText key={i} style={styles.ingredient}>
          • {item}
        </AppText>
      ))}

      <AppText style={styles.explanation}>
        {foundFoodInfo.explanation}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    paddingTop: 5,
    // marginTop: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bad: {
    color: colors.eltrred,
  },
  good: {
    color: colors.eltrgreen,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: colors.eltrdarkred,
  },
  ingredient: {
    marginLeft: 10,
    fontSize: 16,
  },
  explanation: {
    marginTop: 10,
    fontSize: 15,
    color: colors.medium,
    fontStyle: "italic",
  },
});

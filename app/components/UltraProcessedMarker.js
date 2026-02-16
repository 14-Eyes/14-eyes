// Code to determine if the scanned food item contains any level 1-4 ultra-processed marker
// If so, shows the user this marker level along with summarized info about what each number means

import React, { useState } from "react";
import { View, StyleSheet, Linking, Pressable } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// NOVA is the Open Food Facts official food products classification for ultra processed food
const NOVA_INFO = {
  1: {
    label: "NOVA 1",
    title: "Unprocessed or Minimally Processed",
    description:
      "Natural foods altered only by processes such as drying, freezing, or pasteurization.",
    color: colors.eltrgreen,
    background: "#E8F5E9",
  },
  2: {
    label: "NOVA 2",
    title: "Processed Culinary Ingredients",
    description:
      "Substances extracted from natural foods, such as oils, sugar, or salt.",
    color: "#F9A825",
    background: "#FFFDE7",
  },
  3: {
    label: "NOVA 3",
    title: "Processed Food",
    description:
      "Foods made by adding salt, oil, sugar, or other substances from Group 2 to Group 1 foods.",
    color: "#FB8C00",
    background: "#FFF3E0",
  },
  4: {
    label: "NOVA 4",
    title: "Ultra-Processed Food",
    description:
      "Industrial formulations made mostly from substances extracted or refined from foods, often containing additives.",
    color: colors.eltrred,
    background: "#FDECEA",
  },
};

function UltraProcessedMarker({ novaGroup }) {
  const [showInfo, setShowInfo] = useState(false);

  if (!novaGroup || !NOVA_INFO[novaGroup]) return null;

  const nova = NOVA_INFO[novaGroup];

  return (
    <View style={styles.container}>
      {/* Info Button - only shows if food item has NOVA score */}
      <Pressable
        onPress={() => setShowInfo(prev => !prev)}
        style={[
          styles.badge,
          { backgroundColor: nova.background, borderColor: nova.color },
        ]}
      >        
        <AppText style={[styles.badgeText, { color: nova.color }]}>
          {nova.label}: {nova.title}
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
        <View style={[styles.infoBox, { backgroundColor: nova.background }]}>
          <AppText style={styles.infoText}>
            {nova.description}
            {"\n\n"}
            <AppText style={styles.italicText}>
                Classification based on the NOVA system used by Open Food Facts.
            </AppText>
          </AppText>

          <AppText
            style={styles.learnMore}
            onPress={() =>
              Linking.openURL("https://world.openfoodfacts.org/nova")
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

export default UltraProcessedMarker;
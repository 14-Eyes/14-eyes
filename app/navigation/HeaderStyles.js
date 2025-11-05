import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // https://ionic.io/ionicons for icon options
import colors from "../config/colors";

// Creates header with screen name, no back button
export const getMainHeader = (title) => ({
  title,
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { fontSize: 18, marginTop: 0 },
  headerLeft: () => null, // no back arrow
});

// Creates header with orange back button and screen name
export const getSubScreenHeader = (navigation, title) => ({
  title,
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { fontSize: 18, marginTop: 0, },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, marginTop: 0, }}
    >
      <Ionicons name="chevron-back-outline" size={24} color={colors.primary} />
      <Text style={{ color: colors.primary, fontSize: 18, marginLeft: 5 }}>
        Back
      </Text>
    </TouchableOpacity>
  ),
});

// Creates header with orange back button ONLY
export const getSubScreenHeaderBack = (navigation) => ({
  headerTitle: () => null,
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { fontSize: 18, marginTop: 0, },
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, marginTop: 0, }}
    >
      <Ionicons name="chevron-back-outline" size={24} color={colors.primary} />
      <Text style={{ color: colors.primary, fontSize: 18, marginLeft: 5 }}>
        Back
      </Text>
    </TouchableOpacity>
  ),
});

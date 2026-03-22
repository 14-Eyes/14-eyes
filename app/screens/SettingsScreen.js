import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Image, Switch } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AuthContext from "../auth/context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { clearAllOptionCaches } from "../utility/fetchOptions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BIOMETRIC_ENABLED = "biometric_enabled";

const menuItems = [
  { title: "Account", icon: { name: "account", backgroundColor: colors.primary }, target: "AccountDetails" },
  { title: "Child Mode", icon: { name: "account-supervisor", backgroundColor: colors.secondary }, target: "ChildAlert" },
  { title: "About", icon: { name: "information-outline", backgroundColor: colors.eltrgreen }, target: "AboutScreen" },
  { title: "FAQ", icon: { name: "chat-question", backgroundColor: colors.eltrpink }, target: "HelpScreen" },
  { title: "Biometric Login", icon: { name: "fingerprint", backgroundColor: colors.primary }, isToggle: true },
  { title: "Log Out", icon: { name: "logout", backgroundColor: colors.eltryellow }, isLogout: true },
];

function SettingsScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  // Load stored preference
  useEffect(() => {
    const loadBiometricPref = async () => {
      const enabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED);
      setBiometricEnabled(enabled === "true");
    };
    loadBiometricPref();
  }, []);

  // Toggle biometric enable/disable
  const toggleBiometric = async (value) => {
    setBiometricEnabled(value);
    await AsyncStorage.setItem(BIOMETRIC_ENABLED, value ? "true" : "false");
  };

  // Handle logout
  const handleLogOut = async () => {
    try {
      await clearAllOptionCaches();
      await signOut(auth);
      authContext.setUser(null);
      console.log("User signed out, cache cleared");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle press on Biometric Login row
  const handleBiometricPress = async () => {
    // Auto-enable the switch if it's off
    if (!biometricEnabled) {
      setBiometricEnabled(true);
      await AsyncStorage.setItem(BIOMETRIC_ENABLED, "true");
    }
    // Open the BiometricAuthScreen
    navigation.navigate("BiometricAuthScreen");
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <View style={item.isLogout ? styles.logoutContainer : null}>
              <ListItem
                title={item.title}
                onPress={
                  item.isLogout
                    ? handleLogOut
                    : item.isToggle
                    ? handleBiometricPress
                    : item.target
                    ? () => navigation.navigate(item.target)
                    : null
                }
                IconComponent={<Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />}
                rightComponent={
                  item.isToggle ? (
                    <Switch
                      value={biometricEnabled}
                      onValueChange={toggleBiometric}
                      trackColor={{ true: colors.primary, false: colors.medium }}
                    />
                  ) : null
                }
              />
            </View>
          )}
          scrollEnabled={false}
        />
      </View>

      <Text style={styles.sponsor}>Sponsored by</Text>
      <Image style={styles.pic} source={require("../assets/appsponsor.png")} />
      <Text style={styles.bot}>Eat Like The Rainbow App 2025  |  Version 1.0.6</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 1 },
  screen: { backgroundColor: colors.light, paddingTop: 8 },
  sponsor: { fontSize: 23, fontWeight: "bold", marginTop: 15, marginBottom: 10, alignSelf: "center" },
  bot: { fontSize: 15, marginTop: 10, marginBottom: 0, alignSelf: "center" },
  pic: { alignSelf: "center", width: 350, height: 150, resizeMode: 'contain' },
  logoutContainer: { marginTop: 10 },
});

export default SettingsScreen;
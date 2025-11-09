import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Text, Image, Alert } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AuthContext from "../auth/context";
import Firebase from "../config/firebase";

const menuItems = [
  { title: "Account", icon: { name: "account", backgroundColor: colors.primary }, target: "AccountDetails" },
  { title: "Child Mode", icon: { name: "account-supervisor", backgroundColor: colors.secondary }, target: "ChildAlert" },
  { title: "About", icon: { name: "information-outline", backgroundColor: colors.eltrgreen }, target: "AboutScreen" },
  { title: "FAQ", icon: { name: "chat-question", backgroundColor: colors.eltrpink }, target: "HelpScreen" },
  { title: "Log Out", icon: { name: "logout", backgroundColor: colors.eltryellow }, isLogout: true },
];

function SettingsScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await Firebase.auth().signOut();
      authContext.setUser(null); // User will be redirected to Login
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Logout Error", "Failed to log out. Please try again.");
    }
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
                onPress={item.isLogout ? handleLogOut : () => navigation.navigate(item.target)}
                IconComponent={<Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />}
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

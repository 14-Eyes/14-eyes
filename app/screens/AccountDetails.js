import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import Firebase from "../config/firebase";

const menuItems = [
  {
    title: "My Conditions",
    icon: {
      name: "medical-bag",
      backgroundColor: colors.primary,
    },
    target: "AccountConditions",
  },
  {
    title: "My Allergies",
    icon: {
      name: "food-off",
      backgroundColor: colors.secondary,
    },
    target: "AccountAllergies",
  },
  // new button to route to new screen
  {
    title: "Account Center",
    icon: {
      name: "account-cog", // can use any icon from MaterialCommunityIcons
      backgroundColor: colors.eltrpink,
    },
    target: "EditAccount", // should match screen’s route name
  },
];

function AccountDetails({ navigation }) {
  const authContext = useContext(AuthContext);

  const handleLogOut = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        authContext.setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={() => navigation.navigate(item.target)}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountDetails;

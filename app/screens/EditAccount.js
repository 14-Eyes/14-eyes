import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";

function EditAccount({ navigation }) {
  const authContext = useContext(AuthContext);

  const menuItems = [
    {
      title: "Name",
      description: authContext.username,
      iconLeft: "pencil",
      icon: {
        name: "account",
        backgroundColor: colors.primary,
      },
      target: "EditAccountName",
    },
    {
      title: "Email",
      description: authContext.user.email,
      iconLeft: "pencil",
      icon: {
        name: "email",
        backgroundColor: colors.secondary,
      },
      target: "EditAccountEmail",
    },
    {
      title: "Change Password",
      iconLeft: "pencil",
      icon: {
        name: "lock",
        backgroundColor: colors.eltrgreen,
      },
      target: "EditAccountPassword",
    },
  ];
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
              subTitle={item.description}
              iconName={item.iconLeft}
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
      <View style={styles.container}>
        <ListItem
          onPress={() => navigation.navigate(routes.DELETE)}
          title="Delete Account"
          IconComponent={
            <Icon name="account-remove" backgroundColor={colors.danger} />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default EditAccount;

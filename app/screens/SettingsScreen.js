import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Text, Image, Dimensions } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import Firebase from "../config/firebase";

const windowWidth = Dimensions.get('window').width;

const menuItems = [
  {
    title: "Account",
	icon: {
		name: "account",
		backgroundColor: colors.primary,
	},
	target: "AccountDetails",
  },
  {
	title: "Child Mode",
	icon: {
		name: "account-multiple",
		backgroundColor: colors.secondary,
	},
	target: "ChildAlert",
  },
  {
	title: "Help",
	icon: {
		name: "question-mark",
		backgroundColor: colors.danger,
	},
	target: "HelpScreen",
  },
];

function SettingsScreen( { navigation } ) {
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
		<ListItem
		  title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={handleLogOut}
		/>
		<Text style={styles.test}>
			Sponsor

		</Text>
			{/* replace this assets png to change the sponsor image in the settings tab */}
		<Image
			style={styles.pic}
			source={require("../assets/appsponsor.png")}
		/>
		<Text style={styles.bot}>
				Eat Like The Rainbow App
				2022 Version 0.1
		</Text>
	</Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  screen: {
	  backgroundColor: colors.light,
	},
  test: {
	fontSize: 15,
	marginBottom: 10,
	marginTop: 10,
	marginLeft: 5,
	},
  bot: {
	  fontSize: 15,
	  alignSelf: "center",
	  bottom: 0,
    },
  pic: {
	  alignSelf: "center",
	  width: 350,
	height: 150,
	resizeMode: 'contain',
	},
});

export default SettingsScreen;

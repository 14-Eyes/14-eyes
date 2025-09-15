import React from "react";
import { StyleSheet, ScrollView, Text, Linking } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function HelpScreen(props) {
  return (
   <Screen style={styles.container}>
      <ScrollView>
        <AppText style={styles.title}>Need help using the ELTR app?</AppText>

	<AppText style={styles.text}>
          For more information on how to use the ELTR app, please read the user
	  manual <Text style={styles.link1} onPress={() => Linking.openURL('https://eatliketherainbow.org/eltr-mobile-app/')}>here</Text>!
        </AppText>
      </ScrollView>
    </Screen>
  );
}

//how info is being displayed

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: colors.light,
  },
  title: {
    color: colors.primary,
    fontSize: 36,
    marginBottom: 20,
    marginTop: 0,
  },
  link1: {
    color: colors.eltrdarkblue,
    fontWeight: "bold",
    textDecorationLine: 'underline',
    alignItems: "center",
    justifyContent: "center",
  },
});

//exporting function

export default HelpScreen;

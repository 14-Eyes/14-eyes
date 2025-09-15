import React from 'react';
import { StyleSheet, View, Image } from "react-native";

import Screen from "../../components/Screen";
import ChildButtonSmall from "../../components/ChildButtonSmall";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import routes from "../../navigation/routes";

function ChildInfo({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style = {styles.container}>
        <Image
          source={require('../../assets/speechbubble.png')}
          style={styles.speechBubble}
        />
      </View>

      <View style = {styles.container}>
        <AppText style={styles.text}>
          This looks like -blank- Adam Apple gives a grade of:
        </AppText>
      </View>

      <View style = {styles.container}>
        <Image source={require('../../assets/gradee.png')}
          style={styles.grade}
        />
      </View>

      <View style = {styles.container}>
        <AppText style={styles.text}>
          because this beverage contains a lot of sugar.
        </AppText>
      </View>

      <View style = {styles.container}>
        <ChildButtonSmall
          title="Why did Adam give this score?"
          onPress={() => navigation.navigate(routes.CHILD_ABOUTFOOD)}
        />   
      </View>
    </Screen>
    );
  }

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.eltrlightblue,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    marginTop: 10
  },

  speechBubble: {
    marginBottom: 10,
    width: 350,
    height: 600,
    top: 450,
  },

  grade: {
    width: 158,
    height: 162,
    bottom: 120,
  },

  text: {
    color: colors.black,
    fontSize: 25,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    width: 250,
    bottom: 125
  },

});
export default ChildInfo;
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";

import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import ChildBackButton from "../../components/ChildBackButton";

function ChildAlert({navigation}) {
  
  return (
    <Screen style = {styles.screen}>
      <View style = {styles.container}>
        <AppText style={styles.textbox}>
          You are about to switch to <Text style={styles.boldText}>CHILD MODE</Text>. This offers a simplified app experience for children.
        </AppText>
        <AppText style={styles.textbox}>
          You will need to input your account password to exit this mode.
        </AppText>

        <View style={styles.changeButton}>    
          <TouchableOpacity
            onPress={() => navigation.navigate('ChildNavigator')}
            style={[styles.button, { backgroundColor: colors.primary }]}
            >
            <Text style={styles.buttonText}>Change to</Text>
            <Text style={styles.buttonText}>child mode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.backButton}>
          <ChildBackButton
              title="<<   GO BACK"
              onPress={() => navigation.goBack()} // adding goBack() makes screen slide from left to right
          />
        </View>
        </View>            
    </Screen>
  );
}


const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 100,
    paddingTop: 230,
  },              
  textbox: {
    color: colors.black,
    fontWeight: '400',
    fontSize: 20,
    fontStyle: 'normal',
    textAlign: 'center',
    marginVertical: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
  boldText: {
    fontWeight: 'bold', // This applies the bold font weight
  },
  changeButton: {
    width: "75%",
    borderRadius: 25,
    paddingTop: 20,
    marginBottom: 30,
  },
  button: {
    height: 116,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 28,
    color: colors.white,
    textAlign: 'center',
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
  },
  backButton: {
    marginVertical: 50,
  },
});          

export default ChildAlert;
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
  ScrollView
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";
import choices from "../../config/funfact";

export class GameScreenMain extends Component {

  render() {
    return (
      <Screen style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

          <View style={styles.buttonGood}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('LuLuGameScreen')
              }
              style={[styles.button]}
            >
              <Image
                source={require("../../assets/essential_nutrients.png")}
                style={[styles.image]}
              />
              <Text style={styles.buttonText}>Juice Jumble</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('GarmanGameScreen')
              }
              style={[styles.button]}
            >
              <Image
                source={require("../../assets/harmful_ingredients.png")}
                style={[styles.image]}
              />
              <Text style={styles.buttonText}>Fruit Finder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('MuMuGameScreen')
              }
              style={[styles.button]}
            >
              <Image
                source={require("../../assets/harmful_ingredients.png")}
                style={[styles.image]}
              />
              <Text style={styles.buttonText}>Search For Sunrays</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NikaGameScreen')
              }
              style={[styles.button]}
            >
              <Image
                source={require("../../assets/harmful_ingredients.png")}
                style={[styles.image]}
              />
              <Text style={styles.buttonText}>A Nutty Match</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LazarusGameScreen')}
              style={[styles.button]}
            >
              <Image
                source={require("../../assets/food_facts.png")}
                style={[styles.image]}
              />
              <Text style={styles.buttonText}>Word Wakeup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

/* for flex component in container
1 -> (only top half)
2 & 3 ->(all but last button)
4 -> (all 6)
*/

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  flexContainer: {
    alignItems: "center",
    marginVertical: 20,
    // flexDirection: "row",
    // justifyContent: "center",
    // top: 100,
  },

  // grid: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingHorizontal: 45,
  //   marginTop: 15,
  // },
  logo: {
    alignSelf: "center",
		height: 75,
    width: 185, 
		resizeMode: 'contain',
    overflow: "hidden",
    marginTop: 10,
    // marginBottom: 10,
    // width: 250,
    // top: 0,
    // position: "absolute",
    // justifyContent: "center",
  },
  // eltrlogo: {
  //   // alignSelf: "center",
	// 	height: 100,
  //   width: 100, 
	// 	resizeMode: 'contain',
  //   overflow: "hidden",
  //   marginTop: 10,
  //   borderRadius: 20,
  // },

  carouselItem: {
    backgroundColor: "floralwhite",
    borderRadius: 20,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  carouselText: {
    fontSize: 17,
    textAlign: "center",
  },

  buttonGood: {
    // flexDirection: "column",
    width: "90%",
    alignSelf: "center",
    // marginTop: 150,
  },
  text: {
    color: colors.primary,
  },
  button: {
    height: 120,
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    marginVertical: 5,
    // iOS Shadow properties
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // Android Elevation property
    elevation: 6,
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
    color: colors.white,
    textTransform: "uppercase",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    resizeMode: "cover", // Or 'contain', 'stretch', etc.
  },

  donationContainer: {
    backgroundColor: "#EDEDED",
    padding: 15,
    borderRadius: 20,
    marginTop: 25,
    marginBottom: 30,
  },
  donationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#444",
  },
  donationText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 8,
    lineHeight: 20,
  },
  donateButton: {
    backgroundColor: "#6A3DBB",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 10,
  },
  donateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GameScreenMain;
import React, { Component } from "react";
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions,
} from "react-native";

import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import colors from "../../config/colors";

const { width, height } = Dimensions.get("window");

export class GameScreenMain extends Component {

  render() {
    return (
      <Screen style={styles.container}>

        <AppText style={styles.title}>ELTR Garden Adventure</AppText>
        <AppText style={styles.subTitle}>Click on the images to play!</AppText>

        <ScrollView contentContainerStyle={[styles.content, { flexGrow: 1 }]}>

          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.squareButton}
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate('LuLuGameScreen')
              }
            >
              <Image source={require("../../assets/gameStuff/LuLu_Button.png")} style={styles.squareImage} />
              <Text style={styles.squareLabel}>Juice Jumble</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.squareButton}
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate('GarmanGameScreen')
              }
            >
              <Image source={require("../../assets/gameStuff/Garman_Button.png")} style={styles.squareImage} />
              <Text style={styles.squareLabel}>Fruit Finder</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.squareButton}
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate('MuMuGameScreen')
              }
            >
              <Image source={require("../../assets/gameStuff/MuMu_Button.png")} style={styles.squareImage} />
              <Text style={styles.squareLabel}>Search For Sunrays</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.squareButton}
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate('NikaGameScreen')
              }
            >
              <Image source={require("../../assets/gameStuff/Nika_Button.png")} style={styles.squareImage} />
              <Text style={styles.squareLabel}>A Nutty Match</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.squareButton}
              activeOpacity={0.8}
              onPress={() =>
                this.props.navigation.navigate('LazarusGameScreen')
              }
            >
              <Image source={require("../../assets/gameStuff/Lazarus_Button.png")} style={styles.squareImage} />
              <Text style={styles.squareLabel}>Word Wakeup</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const squareSize = width * 0.36;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.eltrlightblue,
    },
    content: {
        flexGrow: 1,
        paddingTop: height * 0.0,
        padding: 20,
    },
    title: {
        color: colors.black,
        fontWeight: "600",
        fontSize: width * 0.09,
        textAlign: "center",
    },
    subTitle: {
        color: colors.black,
        fontSize: width * 0.045,
        textAlign: "center",
    },
    pic: {
    alignSelf: "center",
    // width: 250,
    height: 75,
    resizeMode: 'contain',
        marginBottom: 10,
  },

    // for the square recipe buttons
    // 2 buttons per row with spacing inbetween
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    squareButton: {
        width: squareSize,
        height: squareSize + 10, // extra space for text
        alignItems: "center",
        marginVertical: 25,
    },
    squareImage: {
        width: squareSize,
        height: squareSize,
        backgroundColor: colors.lightgray, // fallback if image doesn’t fill
        resizeMode: "cover",
    },
    squareLabel: {
        marginTop: 4,
        fontSize: 17,
        color: colors.dark,
        textAlign: "center",
    },
    // -----------------

    buttonContainer: {
        width: "100%",
        alignItems: "center",
        flexGrow: 1,
        padding: 30,
    },
});

export default GameScreenMain;
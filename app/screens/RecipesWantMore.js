import React from "react";
import { 
    StyleSheet,
    View, 
    Dimensions,
    Image,
    Linking,
} from "react-native";
// import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");

function RecipesWantMore({ navigation }) {
  return (
    <Screen style={styles.container}>
        <Image
            style={styles.pic}
            source={require("../assets/appsponsor.png")}
        />
        <View style={styles.buttonContainer}>
            <AppButton
                title={"Check out Chef Cathy's website!"}
                onPress={() => Linking.openURL('https://www.chefcathyzeis.com/recipes/')}
                color="primary"
                style={styles.customButton}
                showArrow
                textStyle={styles.buttonText}
            />
        </View>
        <View style={styles.line} />
        <Image
            style={styles.pic2}
            source={require("../assets/eltr-book-pic.png")}
        />
        <View style={styles.buttonContainer}>
            <AppButton
                title="Check out Chef Cathy's book!"
                onPress={() => Linking.openURL('https://www.amazon.com/One-Bite-Time-Everyday-Fighting/dp/1973197316')}
                color="primary"
                style={styles.customButton}
                showArrow
                textStyle={styles.buttonText}
            />
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 30,
        backgroundColor: colors.light,
    },
    content: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center", 
        paddingTop: height * 0.0,
        paddingVertical: height * 0.2,
        paddingHorizontal: width * 0.2,
        // padding: 20,
    },
    pic: {
        alignSelf: "center",
        width: width * 0.6,
        height: height * 0.13,
        resizeMode: "contain",
        marginTop: 20,
        marginBottom: 10,
    },
    pic2: {
        alignSelf: "center",
        width: width * 0.8,
        height: height * 0.3,
        resizeMode: "contain",
        marginBottom: 10,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    customButton: {
        height: height * 0.1,
        width: width * 0.8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        marginVertical: 1,
        padding: 1,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: width * 0.045,
        textTransform: "none",
    },
    line: {
        width: width * 0.8,
        height: 0.8,
        backgroundColor: colors.medium,
        marginVertical: 20,
        alignSelf: "center",
      },
});

export default RecipesWantMore;

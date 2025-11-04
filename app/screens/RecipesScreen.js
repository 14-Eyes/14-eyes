import React from "react";
import { 
    StyleSheet,
    View, 
    ScrollView,
    Dimensions,
    Image,
} from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");

function RecipesScreen() {
  return (
    <Screen style={styles.container}>
        <ScrollView contentContainerStyle={[styles.content, { flexGrow: 1 }]}>
            <AppText style={styles.title}>Recipes</AppText>
            <AppText style={styles.subTitle}>by</AppText>
            <Image
                style={styles.pic}
                source={require("../assets/appsponsor.png")}
            />
            <AppText style={styles.body}>
            Yippee recipes! Welcome in - you'll learn how to cook awesome recipes!!
            </AppText>
            <View style={styles.buttonContainer}>
            <AppButton
                title="Want more?"
                onPress={() => navigation.navigate("WantMoreScreen")}
                color="primary"
                style={styles.customButton}
                showArrow
                textStyle={{ fontWeight: "600", fontSize: width * 0.05, textTransform: "none", }}
            />
        </View>
        </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
    content: {
        flexGrow: 1,
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
        marginBottom: 30,
	},
    body: {
        fontSize: 18,
        lineHeight: 26,
        color: colors.dark,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        flexGrow: 1,
        padding: 30,
    },
    customButton: {
        height: height * 0.075,
        width: width * 0.8,
        alignItems: "center",
        borderRadius: 15,
        marginVertical: 3,
        padding: 1,
    },
});

export default RecipesScreen;
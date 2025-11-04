import React from "react";
import { 
    StyleSheet,
    View, 
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import colors from "../config/colors";

const { width, height } = Dimensions.get("window");

// recipe button data (replace images/titles)
const recipeButtons = [
  { id: 1, title: "Sample Recipe Placeholder 1", image: require("../assets/sampleRecipe.png") },
  { id: 2, title: "Sample Recipe 2", image: require("../assets/sampleRecipe.png") },
  { id: 3, title: "Sample Recipe 3", image: require("../assets/sampleRecipe.png") },
  { id: 4, title: "Sample Recipe 4", image: require("../assets/sampleRecipe.png") },
  { id: 5, title: "Sample Recipe 5", image: require("../assets/sampleRecipe.png") },
  { id: 6, title: "Sample Recipe 6", image: require("../assets/sampleRecipe.png") },
  { id: 7, title: "Sample Recipe 7", image: require("../assets/sampleRecipe.png") },
  { id: 8, title: "Sample Recipe 8", image: require("../assets/sampleRecipe.png") },
];

function RecipesScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
        <AppText style={styles.title}>Recipes</AppText>
        <AppText style={styles.subTitle}>by</AppText>
        <Image
            style={styles.pic}
            source={require("../assets/appsponsor.png")}
        />
        <ScrollView contentContainerStyle={[styles.content, { flexGrow: 1 }]}>
            <View style={styles.grid}>
                {recipeButtons.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.squareButton}
                        onPress={() => navigation.navigate("RecipesSubScreen")}
                        activeOpacity={0.8}
                    >
                        <Image source={item.image} style={styles.squareImage} />
                        <AppText style={styles.squareLabel}>{item.title}</AppText>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <AppButton
                    title="Want more?"
                    onPress={() => navigation.navigate("RecipesWantMore")}
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

const squareSize = width * 0.36; // 2 per row with spacing inbetween

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
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
        height: squareSize + 25, // extra space for text
        alignItems: "center",
        marginVertical: 30,
    },
    squareImage: {
        width: squareSize,
        height: squareSize,
        borderRadius: 15,
        backgroundColor: colors.lightgray, // fallback if image doesn’t fill
        resizeMode: "cover",
    },
    squareLabel: {
        marginTop: 4,
        fontSize: 18,
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
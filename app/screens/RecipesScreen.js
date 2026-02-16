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
import { recipes } from "../config/recipes";

const { width, height } = Dimensions.get("window");

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
                {recipes.map((recipe) => (
                    <TouchableOpacity
                        key={recipe.id}
                        style={styles.squareButton}
                        activeOpacity={0.8}
                        onPress={() => 
                            navigation.navigate("RecipesSubScreen", {
                                recipeId: recipe.id,
                            })
                        }
                    >
                        <Image source={recipe.image} style={styles.squareImage} />
                        <AppText style={styles.squareLabel}>
                            {recipe.title}
                        </AppText>
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

//determines size of the square buttons
const squareSize = width * 0.36;

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
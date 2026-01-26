// this screen lowkey killed me lol.. remind me why we tried to be all fancy with it again

import React, { useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { recipes, TAG_COLORS } from "../config/recipes";
import LineDivider from "../components/Divider";
// import { SensorType } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.45;    // height of the recipe image header - 45%

// fallback to eltr orange in case tag color retrieval fails
const getTagColor = (tag) => {
  return TAG_COLORS[tag] || colors.primary;
};


// Edit ingredients list with whatever ingredients
/*  I really want to have this pull from a database of recipes
    of some some sort, I just don't know how to do that yet so this
    is a static screen */
// const ingredientsList = [
//     "4 cups whole grain oats",
//     "2 tbsp honey",
//     "1/2 cup almond milk",
//     "1 tsp cinnamon powder",
//     "1 ripe banana",
// ];

function RecipesSubScreen({ route, navigation }) {
    const { recipeId } = route.params;
    const recipe = recipes.find((r) => r.id === recipeId);
    
    // scrollY tracks verical scroll position in real time
    const scrollY = useRef(new Animated.Value(0)).current;

    // backup failsafe
    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>Error: Recipe not found.</Text>
            </View>
        );
    }

    // Fade effect for header image on scroll down
    // - Starts opaque (1) at the top
    // - Fades to 60% opactity at halfway mark
    // - Becomes invisible (0) when HEADER_HEIGHT is reached by scrolling
    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT * 0.5, HEADER_HEIGHT * 0.9],
        outputRange: [1, 0.6, 0],
        extrapolate: "clamp",
    });

    // Effect that causes image to move slightly up as user scrolls down
    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -50],
        extrapolate: "clamp",
    });

    // Stretch the image a bit when pulling down (i.e. negative scroll)
    const imageScale = scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, 0],
        outputRange: [2, 1],
        extrapolateRight: "clamp",
    });

    return (
        <View style={styles.container}>
            {/* Recipe image */}
            <Animated.Image
                source={recipe.image}
                style={[
                    styles.headerImage,
                    {
                        opacity: imageOpacity,
                        transform: [
                            { translateY: imageTranslateY },
                            { scale: imageScale },
                        ],
                    },
                ]}
            />

            {/* Recipe */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT - 40 }} // change 40 here to have the white recipe box start higher or lower on the image
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            >
                <View style={styles.content}>
                    {/* Recipe title */}
                    <Text style={styles.title}>{recipe.title}</Text>

                    {/* Recipe time */}
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="clock-outline" size={25} color={colors.black}/>
                        <Text style={styles.infoText}>Prep: {recipe.prepTime}</Text>
                        <Text style={styles.infoText}>Cook: {recipe.cookTime}</Text>
                        <Text style={styles.infoText}>Total: {recipe.totalTime}</Text>
                    </View>

                    {/* Recipe tags */}
                    <View style={styles.tagRow}>
                        {recipe.tags.map((tag) => (
                            <View key={tag} style={[styles.tag, { backgroundColor: getTagColor(tag) }, ]}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.recipeBox}>
                        {/* Recipe ingredients list */}
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {recipe.ingredients.map((item, index) => (
                            <View key={index} style={styles.listItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.listText}>{item}</Text>
                            </View>
                        ))}

                        {/* Recipe instructions list */}
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        {recipe.instructions.map((step, index) => (
                            <Text key={index} style={styles.instructions}>
                                {index + 1}. {step}
                            </Text>
                        ))}

                        {/* Recipe notes */}
                        {/* <Text style={styles.sectionTitle}>Notes</Text> */}
                        {recipe.notes.map((note, index) => (
                            <Text key={index} style={styles.notes}>
                                {note}
                            </Text>
                        ))}

                        <LineDivider />

                        {/* Recipe Description */}
                        {recipe.description.map((text, index) => (
                            <Text key={index} style={styles.description}>
                                {text}
                            </Text>
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>

            {/* Back button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={26} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
    headerImage: {
        position: "absolute",
        width: "100%",
        height: HEADER_HEIGHT,
        resizeMode: "cover",
        top: 0,
    },
    content: {
        backgroundColor: colors.light,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        minHeight: height,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 15,
    },
    infoText: {
        fontSize: 15,
        lineHeight: 26,
    },
    tagRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    tag: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
    },
    tagText: {
        color: "white",
        fontSize: 13,
        fontWeight: "600",
    },
    recipeBox: {
        borderWidth: 1,
        borderColor: colors.lightGray || "#ccc",
        borderRadius: 12,
        padding: 16,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 15,
    },
    description: {
        fontSize: 17,
        lineHeight: 28,
        marginTop: 6,
        marginBottom: 6,
        color: colors.dark,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 6,
    },
    bullet: {
        fontSize: 28,
        lineHeight: 28,
        marginRight: 10,
        color: colors.dark,
    },
    listText: {
        fontSize: 17,
        lineHeight: 24,
        color: colors.dark,
        flexShrink: 1,
    },
    instructions: {
        fontSize: 17,
        lineHeight: 28,
        marginBottom: 6,
        color: colors.dark,
    },
    notes: {
        fontSize: 17,
        lineHeight: 28,
        marginTop: 15,
        // marginBottom: 6,
        color: colors.dark,
        fontStyle: "italic",
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 15,
        width: 45,
        height: 45,
        backgroundColor: "white",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: colors.black,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        zIndex: 5,
    },
});

export default RecipesSubScreen;

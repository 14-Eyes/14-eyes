import React from "react";
import { StyleSheet, ScrollView, View, Dimensions, Text, Linking } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

const { height, width } = Dimensions.get("window");

const groceryList = [
    { text: ["1 package ", { label: "chicken", url: "https://www.chefcathyzeis.com/tags/chicken/" }, " thighs (8 count)"] },
    { text: ["1 package ", { label: "pork", url: "https://www.chefcathyzeis.com/tags/pork/" }, " tenderloin"] },
    { text: ["1 carton large ", { label: "eggs", url: "https://www.chefcathyzeis.com/tags/eggs/" }] },
    { text: ["15 oz. bag ", { label: "pinto beans", url: "https://www.chefcathyzeis.com/tags/beans/" }] },
    { text: ["2 ", { label: "sweet potatoes", url: "https://www.chefcathyzeis.com/tags/sweet-potato/" }, " or Idaho potatoes"] },
    { text: ["1 crown fresh broccoli"] },
    { text: ["1 bunch ", { label: "bananas", url: "https://www.chefcathyzeis.com/tags/bananas/" }] },
    { text: ["1 box Cheerios"] },
    { text: ["1 gallon Silk Almond Milk with Vanilla OR 2% milk"] },
    { text: ["***If buying for kids under 18, please buy whole milk! Their brains and muscles need it for development."], italic: true },
    { text: ["2.37 oz. garlic powder"] },
    { text: ["2.37 oz. ground cinnamon"] },
    { text: ["2.37 oz. black pepper"] },
    { text: ["2.37 oz. ground cumin"] },
];

function SampleBudgetScreen() {
  return (
    <Screen style={styles.container}>
        <View style={styles.header}>
            <AppText style={styles.title}>$25</AppText>
            <AppText style={styles.subTitle}>Sample Budget</AppText>
        </View>

        {/* Scrollable text box */}
        <View style={styles.scrollBox}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <AppText style={styles.subTitle}>Grocery List</AppText>
            <View style={styles.line} />

            {groceryList.map((item, index) => (
                <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.listText, item.italic && styles.italicText]}>
                    {item.text.map((part, i) =>
                    typeof part === "string" ? (
                        part
                    ) : (
                        <Text
                        key={i}
                        style={styles.linkText}
                        onPress={() => Linking.openURL(part.url)}
                        >
                        {part.label}
                        </Text>
                    )
                    )}
                </Text>
                </View>
            ))}
            </ScrollView>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start", // evenly space header, buttons, and chatbot button
        alignItems: "center",
        backgroundColor: colors.light,
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    header: {
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 45,
        fontWeight: "700",
    },
    subTitle: {
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
    },
    bodyIntro: {
        fontSize: 18,
        lineHeight: 24,
        color: colors.dark,
        textAlign: "center",
    },
    scrollBox: {
        width: width * 0.84,
        height: height * 0.55,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        borderColor: colors.lightGray,
        borderWidth: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    line: {
        width: width * 1,
        height: 2,
        backgroundColor: colors.lightGray,
        marginVertical: 10,
        alignItems: "center",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 4,
    },
    bullet: {
        fontSize: 25,
        lineHeight: 26,
        marginRight: 8,
        color: colors.dark,
    },
    listText: {
        fontSize: 18,
        lineHeight: 26,
        color: colors.dark,
        flexShrink: 1,
    },
    linkText: {
        color: colors.eltrdarkblue,
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    italicText: {
        fontStyle: "italic",
    },
});

export default SampleBudgetScreen;
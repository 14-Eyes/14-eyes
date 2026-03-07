import React from "react";
import { StyleSheet, ScrollView, View, Dimensions, Text, Linking } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { budgets } from "../config/budgets";

const { height, width } = Dimensions.get("window");

function SampleBudgetScreen({route, navigation}) {
    const { budgetId } = route.params;
    const budget = budgets.find((b) => b.id === budgetId);
  
    // backup failsafe
    if (!budget) {
        return (
            <View style={styles.container}>
                <Text>Error: Budget not found.</Text>
            </View>
        );
    }

    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.title}>{budget.id}</AppText>
                <AppText style={styles.subTitle}>Sample Budget</AppText>
                <AppText style={styles.subText}>The following is an estimate of what can be purchased with this budget. Grocery cost may vary depending on your location.</AppText>
            </View>

            {/* Scrollable text box */}
            <View style={styles.scrollBox}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <AppText style={styles.subTitle}>Grocery List</AppText>
                    <View style={styles.line} />

                    {budget.items.map((item, index) => (
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
    subText: {
        fontSize: 15,
        marginTop: 10,
        width: width * 0.85,
        color: colors.dark,
        textAlign: "center",
    },
    bodyIntro: {
        fontSize: 18,
        lineHeight: 24,
        color: colors.dark,
        textAlign: "center",
    },
    scrollBox: {
        width: width * 0.85,
        height: height * 0.50,
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
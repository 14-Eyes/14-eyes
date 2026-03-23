import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function BudgetingBasicsScreen() {
  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={styles.title}>Budgeting Basics</AppText>
        <AppText style={styles.body}>
          Budgeting can be easy when you know what you're doing.{"\n"}
          Lets go over some quick tips you can put in to practice today!{"\n"}{"\n"}
          • Pay With Cash!{"\n"}
           [INDENT] Bring a set amount of cash to your next shopping trip to help stay in budget, rather than using your card.{"\n"}
          • Try Store Brands!{"\n"}
           [INDENT] In-store brands are often cheaper and sometimes will even be less processed than name brands.{"\n"}
          •Check the Fridge!{"\n"}
           [INDENT] Check your cupboard, pantry, fridge, and any other drawers you have before planning your list! No need to waste money buying something you already have enough of.{"\n"}
          •Have a Plan!{"\n"}
           [INDENT]Go in with a list, budget, and recipe plan for the week. Don't spend time getting random things without knowing how you'll use them, and don't get roped into fancy sales and new promotions for things you don't need.{"\n"}
          •Sign Up for Rewards!{"\n"}
           [INDENT] Most stores will have free reward and loyalty programs you can sign up for! Use these to get added coupons and stay on top of upcoming sales.{"\n"}
          •When Not to Shop!{"\n"}
           [INDENT] Avoid shopping when you're hungry, tired, or stressed, as these can lead to further spending on needless items. Always go in with a critical mind and focus on what you need.{"\n"}
          •Shop Around!{"\n"}
           [INDENT] Check specialized stores and local sales before heading out! No need to buy everything in one spot when you can save money by getting other products at nearby stores.{"\n"}
        </AppText>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.eltrred,
  },
  body: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.dark,
  },
});

export default BudgetingBasicsScreen;

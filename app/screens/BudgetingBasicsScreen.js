import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import LineDivider from "../components/Divider"; // Horizontal divider

function BudgetingBasicsScreen() {
  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText style={styles.title}>Budgeting Basics</AppText>
        <AppText style={styles.body}>
          Budgeting can be easy when you know what you're doing.
          Lets go over some quick tips you can put in to practice today!
        </AppText>

        <LineDivider />
        
          <View style={styles.box}>
            <AppText style={styles.subTitle}>
              Pay With Cash!
            </AppText>
            <AppText style={styles.text}>
              Bring a set amount of cash to your next shopping trip 
              to help stay in budget, rather than using your card.
            </AppText>
          </View>

        <View style={styles.box}>
          <AppText style={styles.subTitle}>
            Try Store Brands!
          </AppText>
          <AppText style={styles.text}>
            In-store brands are often cheaper and sometimes will even 
            be less processed than name brands.
          </AppText>
        </View>

        <View style={styles.box}>
          <AppText style={styles.subTitle}>
            Check the Fridge!
          </AppText>
          <AppText style={styles.text}>
            Check your cupboard, pantry, fridge, and any other drawers 
            you have before planning your list! No need to waste money 
            buying something you already have enough of.
          </AppText>
        </View>

        <View style={styles.box}>
          <AppText style={styles.subTitle}>
            Have a Plan!
          </AppText>
          <AppText style={styles.text}>
            Go in with a list, budget, and recipe plan for the week. 
            Don't spend time getting random things without knowing how 
            you'll use them, and don't get roped into fancy sales and 
            new promotions for things you don't need.
            {"\n\n"}Check out our <Text style={{fontWeight: "bold"}}>Sample Budget </Text>
            pages for some Chef Cathy Zeis recommended sample grocery lists!
          </AppText>
        </View>

        <View style={styles.box}>
          <AppText style={styles.subTitle}>
            Sign Up for Rewards!
          </AppText>
          <AppText style={styles.text}>
            Most stores will have free reward and loyalty programs 
            you can sign up for! Use these to get added coupons and 
            stay on top of upcoming sales.
          </AppText>
        </View>

        <View style={styles.box}>
          <AppText style={styles.subTitle}>
            When Not to Shop!
          </AppText>
          <AppText style={styles.text}>
            Avoid shopping when you're hungry, tired, or stressed, 
            as these can lead to further spending on needless items. 
            Always go in with a critical mind and focus on what you need.
          </AppText>
        </View>

        <View style={styles.box}>
          <AppText style={styles.subTitle}>
            Shop Around!
          </AppText>
          <AppText style={styles.text}>
            Check specialized stores and local sales before heading out!
            No need to buy everything in one spot when you can save money 
            by getting other products at nearby stores.
            {"\n\n"}Check out our <Text style={{fontWeight: "bold"}}>Stores & Sales </Text>
            page for quick access to store coupons and sales near you!
          </AppText>
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
    padding: 20,
    paddingBottom: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.eltrred,
  },
  body: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    color: colors.dark,
  },
  box: {
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    elevation: 3, // android
    shadowColor: "#000", // ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subTitle: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.eltrdarkred,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    // marginBottom: 10,
    color: colors.dark,
  },
});

export default BudgetingBasicsScreen;

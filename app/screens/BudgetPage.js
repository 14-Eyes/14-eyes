import React from "react";
import { ScrollView, FlatList, StyleSheet, View, Text, Linking, TouchableOpacity, Image } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";


function Budgets({navi}) {
    return (
      <Screen style={styles.container}>
        <AppText style={styles.title}>Ingredient Budgets!</AppText>
        <ScrollView>
      <View style={styles.container}/>
        <AppText style={styles.bookredirectText}>{"\n\n"}Click the book to be taken to the Amazon page!</AppText>
        <TouchableOpacity activeOpacity={.8} onPress={() => Linking.openURL('https://www.amazon.com/One-Bite-Time-Everyday-Fighting/dp/1973197316')}>
        <Image
          style={styles.pic2book}
          source={require("../assets/eltr-book-pic.png")}
        />
        <AppText>{"\n"}</AppText>
        </TouchableOpacity>
        <Text style={styles.header1}>$25</Text>
        <Text style={styles.text1}>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/chicken/')}>chicken</Text> thighs (8 count){'\n'}</Text>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/pork/')}>pork</Text> tenderloin{'\n'}</Text>
          <Text>{'\u2022'}1 carton large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/eggs/')}>eggs</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-15 oz. bag <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beans/')}>pinto beans</Text>{'\n'}</Text>
          <Text>{'\u2022'}2 <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/sweet-potato/')}>sweet potatoes</Text> or Idaho potatoes{'\n'}</Text>
          <Text>{'\u2022'}1 crown fresh broccoli{'\n'}</Text>
          <Text>{'\u2022'}1 bunch <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bananas/')}>bananas</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 box Cheerios{'\n'}</Text>
          <Text>{'\u2022'}1 gallon Silk Almond Milk with Vanilla OR 2% milk{'\n'}</Text>
          <Text style={{fontStyle: 'italic'}}>{'\t'}***If buying for kids under 18, please buy whole milk!{'\n\t'}Their brains and muscle need the whole milk to help {'\n\t'}with the development of their brain and muscles{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. garlic powder{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cinnamon{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. black pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cumin{'\n'}</Text>
        </Text>
      <View style={{ flex: 2}} />
        <Text style={styles.header1}>$50</Text>
        <Text style={styles.text1}>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/chicken/')}>chicken</Text> thighs (8 count){'\n'}</Text>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/pork/')}>pork</Text> tenderloin{'\n'}</Text>
          <Text>{'\u2022'}1 frozen package wild caught <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/salmon/')}>salmon</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/eggs/')}>eggs</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-15 oz. bag <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beans/')}>pinto beans</Text>{'\n'}</Text>
          <Text>{'\u2022'}2 <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/sweet-potato/')}>sweet potatoes</Text> or Idaho potatoes{'\n'}</Text>
          <Text>{'\u2022'}1 lemon{'\n'}</Text>
          <Text>{'\u2022'}1 crown fresh broccoli{'\n'}</Text>
          <Text>{'\u2022'}1 carton fresh baby <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/spinach/')}>spinach</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 red <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/onion/')}>onion</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 bunch red grapes{'\n'}</Text>
          <Text>{'\u2022'}1 bunch <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bananas/')}>bananas</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton Better Oats Steel Cut Instant Oatmeal with Flax Seeds{'\n'}</Text>
          <Text>{'\u2022'}1-12 oz. jar local honey{'\n'}</Text>
          <Text>{'\u2022'}1 box Cheerios{'\n'}</Text>
          <Text>{'\u2022'}1 gallon Silk Almond Milk with Vanilla OR 2% milk{'\n'}</Text>
          <Text style={{fontStyle: 'italic'}}>{'\t'}***If buying for kids under 18, please buy whole milk!{'\n\t'}Their brains and muscle need the whole milk to help {'\n\t'}with the development of their brain and muscles{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. garlic powder{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cinnamon{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. black pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. cayenne pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cumin{'\n'}</Text>
        </Text>
      <View style={{ flex: 2}} />
        <Text style={styles.header1}>$75</Text>
        <Text style={styles.text1}>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/chicken/')}>chicken</Text> thighs (8 count){'\n'}</Text>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/pork/')}>pork</Text> tenderloin{'\n'}</Text>
          <Text>{'\u2022'}1 frozen package wild caught <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/salmon/')}>salmon</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/eggs/')}>eggs</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-package All Natural <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bacon/')}>Bacon</Text> (free of nitrates, nitrites and preservatives){'\n'}</Text>
          <Text>{'\u2022'}1-lb. sliced <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/turkey/')}>turkey</Text> breast (free of nitrates, nitrites and preservatives){'\n'}</Text>
          <Text>{'\u2022'}1-lb. baby swiss <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/cheese/')}>cheese</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 package Flatouts or Dave's Killer <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bread/')}>Bread</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-16 oz. spicy mustard or Hellman's Mayo{'\n'}</Text>
          <Text>{'\u2022'}1-15 oz. bag <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beans/')}>pinto beans</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 box wild or brown rice{'\n'}</Text>
          <Text>{'\u2022'}2 <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/sweet-potato/')}>sweet potatoes</Text> or Idaho potatoes{'\n'}</Text>
          <Text>{'\u2022'}1 lemon{'\n'}</Text>
          <Text>{'\u2022'}1 crown fresh broccoli{'\n'}</Text>
          <Text>{'\u2022'}1 carton fresh baby <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/spinach/')}>spinach</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 red <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/onion/')}>onion</Text>{'\n'}</Text>
          <Text>{'\u2022'}2 large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/tomato/')}>tomatoes</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 bunch red grapes{'\n'}</Text>
          <Text>{'\u2022'}1 bunch <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bananas/')}>bananas</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton Better Oats Steel Cut Instant Oatmeal with Flax Seeds{'\n'}</Text>
          <Text>{'\u2022'}1-12 oz. jar local honey{'\n'}</Text>
          <Text>{'\u2022'}1 box Cheerios{'\n'}</Text>
          <Text>{'\u2022'}1 gallon Silk Almond Milk with Vanilla OR 2% milk{'\n'}</Text>
          <Text style={{fontStyle: 'italic'}}>{'\t'}***If buying for kids under 18, please buy whole milk!{'\n\t'}Their brains and muscle need the whole milk to help {'\n\t'}with the development of their brain and muscles{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. garlic powder{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cinnamon{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. black pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. cayenne pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cumin{'\n'}</Text>
        </Text>
      <View style={{ flex: 2}}/>
        <Text style={styles.header1}>$100</Text>
        <Text style={styles.text1}>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/chicken/')}>chicken</Text> thighs (8 count){'\n'}</Text>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/pork/')}>pork</Text> tenderloin{'\n'}</Text>
          <Text>{'\u2022'}1 frozen package wild caught <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/salmon/')}>salmon</Text>{'\n'}</Text>
          <Text>{'\u2022'}2 lbs. 80/20 ground <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beef/')}>beef</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/eggs/')}>eggs</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-package All Natural <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bacon/')}>Bacon</Text> (free of nitrates, nitrites and preservatives){'\n'}</Text>
          <Text>{'\u2022'}1-lb. sliced <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/turkey/')}>turkey</Text> breast (free of nitrates, nitrites and preservatives){'\n'}</Text>
          <Text>{'\u2022'}1-lb. baby swiss <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/cheese/')}>cheese</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-8 oz. Sargento cheddar <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/cheese/')}>cheese</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 package Flatouts or Dave's Killer <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bread/')}>Bread</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-16 oz. spicy mustard or Hellman's Mayo{'\n'}</Text>
          <Text>{'\u2022'}1-15 oz. bag <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beans/')}>pinto beans</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 box wild or brown rice{'\n'}</Text>
          <Text>{'\u2022'}2 <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/sweet-potato/')}>sweet potatoes</Text> or Idaho potatoes{'\n'}</Text>
          <Text>{'\u2022'}1 lemon{'\n'}</Text>
          <Text>{'\u2022'}2 yellow <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/squash/')}>squash</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 crown fresh broccoli{'\n'}</Text>
          <Text>{'\u2022'}1 carton fresh baby <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/spinach/')}>spinach</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 red <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/onion/')}>onion</Text>{'\n'}</Text>
          <Text>{'\u2022'}2 large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/tomato/')}>tomatoes</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/mushrooms/')}>mushrooms</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 bunch red grapes{'\n'}</Text>
          <Text>{'\u2022'}1 bunch <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bananas/')}>bananas</Text>{'\n'}</Text>
          <Text>{'\u2022'}4 Red Delicious apples{'\n'}</Text>
          <Text>{'\u2022'}1-28 oz. Low-Sodium Creamy JIF <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/peanut-butter/')}>peanut butter</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton Better Oats Steel Cut Instant Oatmeal with Flax Seeds{'\n'}</Text>
          <Text>{'\u2022'}1-12 oz. jar local honey{'\n'}</Text>
          <Text>{'\u2022'}1 box Cheerios{'\n'}</Text>
          <Text>{'\u2022'}1 box Kashi Cinnamon Harvest cereal{'\n'}</Text>
          <Text>{'\u2022'}1 gallon Silk Almond Milk with Vanilla OR 2% milk{'\n'}</Text>
          <Text style={{fontStyle: 'italic'}}>{'\t'}***If buying for kids under 18, please buy whole milk!{'\n\t'}Their brains and muscle need the whole milk to help {'\n\t'}with the development of their brain and muscles{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. garlic powder{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cinnamon{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. black pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. cayenne pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. chili powder{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cumin{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. sea salt{'\n'}</Text>
        </Text>
      <View style={{ flex: 2}}/>
        <Text style={styles.header1}>$125</Text>
        <Text style={styles.text1}>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/chicken/')}>chicken</Text> thighs (8 count){'\n'}</Text>
          <Text>{'\u2022'}1 package <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/pork/')}>pork</Text> tenderloin{'\n'}</Text>
          <Text>{'\u2022'}1 frozen package wild caught <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/salmon/')}>salmon</Text>{'\n'}</Text>
          <Text>{'\u2022'}2 lbs. 80/20 ground <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beef/')}>beef</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/eggs/')}>eggs</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-package All Natural <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bacon/')}>Bacon</Text> (free of nitrates, nitrites and preservatives){'\n'}</Text>
          <Text>{'\u2022'}1-lb. sliced <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/turkey/')}>turkey</Text> breast (free of nitrates, nitrites and preservatives){'\n'}</Text>
          <Text>{'\u2022'}1-lb. sliced <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/ham/')}>ham</Text> (free of nitrates, nitrites and preservatives){'\n'}</Text>
          <Text>{'\u2022'}1-lb. baby swiss <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/cheese/')}>cheese</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-8 oz. Sargento cheddar <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/cheese/')}>cheese</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 package Flatouts or Dave's Killer <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bread/')}>Bread</Text>{'\n'}</Text>
          <Text>{'\u2022'}1-16 oz. spicy mustard or Hellman's Mayo{'\n'}</Text>
          <Text>{'\u2022'}1-15 oz. bag <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beans/')}>pinto beans</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 box wild or brown rice{'\n'}</Text>
          <Text>{'\u2022'}2 <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/sweet-potato/')}>sweet potatoes</Text> or Idaho potatoes{'\n'}</Text>
          <Text>{'\u2022'}1 carton blue corn taco shells{'\n'}</Text>
          <Text>{'\u2022'}1 can <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/beans/')}>black beans</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 lemon{'\n'}</Text>
          <Text>{'\u2022'}2 yellow <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/squash/')}>squash</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 crown fresh broccoli{'\n'}</Text>
          <Text>{'\u2022'}1 carton fresh baby <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/spinach/')}>spinach</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 red <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/onion/')}>onion</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 white <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/onion/')}>onion</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 green pepper{'\n'}</Text>
          <Text>{'\u2022'}2 large <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/tomato/')}>tomatoes</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/mushroom/')}>mushrooms</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 bunch red grapes{'\n'}</Text>
          <Text>{'\u2022'}1 bunch <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/bananas/')}>bananas</Text>{'\n'}</Text>
          <Text>{'\u2022'}4 Red Delicious apples{'\n'}</Text>
          <Text>{'\u2022'}1-8 oz. bag frozen blueberries{'\n'}</Text>
          <Text>{'\u2022'}1-28 oz. Low-Sodium Creamy JIF <Text style={styles.link1} onPress={() => Linking.openURL('https://www.chefcathyzeis.com/tags/peanut-butter/')}>peanut butter</Text>{'\n'}</Text>
          <Text>{'\u2022'}1 carton Better Oats Steel Cut Instant Oatmeal with Flax Seeds{'\n'}</Text>
          <Text>{'\u2022'}1-12 oz. jar local honey{'\n'}</Text>
          <Text>{'\u2022'}1 box Cheerios{'\n'}</Text>
          <Text>{'\u2022'}1 box Kashi Cinnamon Harvest cereal{'\n'}</Text>
          <Text>{'\u2022'}1 gallon Silk Almond Milk with Vanilla OR 2% milk{'\n'}</Text>
          <Text style={{fontStyle: 'italic'}}>{'\t'}***If buying for kids under 18, please buy whole milk!{'\n\t'}Their brains and muscle need the whole milk to help {'\n\t'}with the development of their brain and muscles{'\n'}</Text>
          <Text>{'\u2022'}1-4 pack carton Oikos Triple Zero Berry Yogurt{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. garlic powder{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cinnamon{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. black pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. cayenne pepper{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. chili powder{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. ground cumin{'\n'}</Text>
          <Text>{'\u2022'}1-2.37 oz. sea salt{'\n'}</Text>
        </Text>
      </ScrollView>
      </Screen>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
    //justifyContent: "center",
    //alignItems: "center",
  },
  container: {
    //flex: 2,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    //marginBottom: 0,
    backgroundColor: colors.light,
  },
  title: {
    color: colors.eltrdarkblue,
    fontSize: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  header1: {
    color: colors.eltrdarkblue,
    fontSize: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: colors.eltrdarkblue,
    fontSize: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  link1: {
    color: colors.eltrdarkblue,
    fontSize: 13,
    fontWeight: "bold",
    textDecorationLine: 'underline',
    alignItems: "center",
    justifyContent: "center",
  },
  pic2book: {
    alignSelf: "center",
    width: 280,
    height: 425,
  },
  bookredirectText: {
    fontSize: 15,
    left: 25,
    fontWeight: "bold", 
    color: colors.primary,
  },
});

export default Budgets;
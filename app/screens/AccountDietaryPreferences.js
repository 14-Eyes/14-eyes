import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AuthContext from "../auth/context";
import AppPicker from "../components/AppPicker";
import AppText from "../components/AppText";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists/index";
import ScreenFlexible from "../components/ScreenFlexible";
import colors from "../config/colors";
//import choices from "../config/options";
import sstore from "../utility/sstore";
import { fetchDiet } from "../utility/fetchOptions";

let initialItems = [];

//const dietChoices = choices.dietChoices;

function AccountDietaryPreferences(props) {
  const authContext = useContext(AuthContext);
  const key = authContext.user.uid + "diets";

  const [diets, setDiets] = useState(initialItems);
  const [dietChoices, setDietChoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      //fetch dietary preferences from firestore
      const choices = await fetchDiet();
      setDietChoices(choices);

      //fetch user information
      const userDocRef = doc(db, "users", authContext.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const dietIDs = data.dietary_preferences || [];

        const fullDiets = dietIDs
          .map(id => choices.find(choice => choice.id === id))
          .filter(diet => diet !== undefined);
        
        setDiets(fullDiets);
        sstore.store(key, fullDiets);
      }
    } catch (error) {
      console.error("Firestore dietary preferences loading error:", error);

      const response = await sstore.get(key);
      setDiets(response || []);
    } finally {
      setLoading(false);
    }
    //const response = await sstore.get(key);
    //setDiets(response);
  };

  //delete dietary preferences from user account
  const handleDelete = async (diet) => {
    try{

      const updated = diets.filter((m) => m.id !== diet.id);
      setDiets(updated);

      const userDocRef = doc(db, "users", authContext.user.uid);
      await updateDoc(userDocRef, {
        dietary_preferences: arrayRemove(diet.id)
      });

      sstore.store(key, updated);
      console.log("Removed dietary preference");

    }catch (error) {
      console.error("Error with dietary preference removal:", error);
      loadData();
    }
  };

  //selecting a dietart preferences
  const onSelectItem = async (diet) => {
    if (diets.find(c => c.id === diet.id)) {
      console.log("Dietary preference already added");
      return;
    }
    try {
      const updated = [...diets, diet];
      setDiets(updated);

      const userDocRef = doc(db, "users", authContext.user.uid);
      await updateDoc(userDocRef, {
        dietary_preferences: arrayUnion(diet.id)
      });

      sstore.store(key, updated);
      console.log("Added dietary preference");

    } catch (error) {
      console.error("Error adding dietary preference", error);
      loadData();
    }
  };

  return (
    <ScreenFlexible style={styles.screen}>
      {/* Layout wrapper to position tooltip outside scroll area */}
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <AppPicker
            placeholder="Add Dietary Preference"
            items={dietChoices}
            onSelectItem={onSelectItem}
          />

          <FlatList
            data={diets}
            keyExtractor={(diet) => diet.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                title={item.label}
                subTitle={item.description}
                titleStyle={{ paddingLeft: 0 }}
                image={item.image}
                renderRightActions={() => (
                  <ListItemDeleteAction onPress={() => handleDelete(item)} />
                )}
                swipeable
                showChevron={false} 
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Tooltip BELOW the list (not overlapping) */}
        <View style={styles.toolTipContainer}>
          <AppText style={styles.toolTipText}>Swipe left to remove preferences</AppText>
        </View>
      </View>
    </ScreenFlexible>
  );
}

const TOOLTIP_HEIGHT = 90;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 0, // moves top of the list lower on screen
  },
  listWrapper: {
    flex: 1,
    marginBottom: TOOLTIP_HEIGHT, // reserve space for tooltip
  },
  listContent: {
    // paddingBottom: 45, // adds padding at the end of the list
  },
  toolTipContainer: {
    height: TOOLTIP_HEIGHT,
    bottom: "15%", // can also do "bottom: 100" - space between bottom of toolTip and bottom of screen
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    // borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.medium,
  },
  toolTipText: {
    color: colors.primary,
    fontSize: 22,
  },
});

export default AccountDietaryPreferences;
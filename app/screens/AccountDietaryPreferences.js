import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
import choices from "../config/options";
import sstore from "../utility/sstore";

let initialItems = [];

const dietChoices = choices.dietChoices;

function AccountDietaryPreferences(props) {
  const authContext = useContext(AuthContext);
  const key = authContext.user.uid + "diets";
  const [diets, setDiets] = useState(initialItems);

  useEffect(() => {
    loadDiets();
  }, []);

  const loadDiets = async () => {
    const response = await sstore.get(key);
    setDiets(response);
  };

  const handleDelete = (diet) => {
    // Delete the item from item
    const updated = diets.filter((m) => m.id !== diet.id);
    sstore.store(key, updated);
    setDiets(updated);
  };

  const onSelectItem = (diet) => {
    //console.log(diets);
    if (diets.includes(diet)) {
      setDiets(diets);
    } else {
      const updated = JSON.parse(JSON.stringify(diets));
      updated.push(diet);
      sstore.store(key, updated);
      setDiets(updated);
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
    paddingBottom: 45, // adds padding at the end of the list
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
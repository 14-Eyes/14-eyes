import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppPicker from "../components/AppPicker";
import AppText from "../components/AppText";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists/index";
import Screen from "../components/Screen";
import colors from "../config/colors";
import choices from "../config/options";
import sstore from "../utility/sstore";
import AuthContext from "../auth/context";

let initialItems = [];

const conditionChoices = choices.conditionChoices;

function AccountConditions(props) {
  const authContext = useContext(AuthContext);
  const key = authContext.user.uid + "conditions"; //use user id to create unique id for async storage
  const [conditions, setConditions] = useState(initialItems);

  /* use effect runs only once each time page is rendered */
  useEffect(() => {
    loadConditions();
  }, []);

  const loadConditions = async () => {
    const response = await sstore.get(key);
    setConditions(response);
  };

  const handleDelete = (condition) => {
    // Delete the item from item
    const updated = conditions.filter((m) => m.id !== condition.id);
    setConditions(updated);
    sstore.store(key, updated);
  };

  const onSelectItem = (condition) => {
    if (conditions.includes(condition)) {
      setConditions(conditions);
    } else {
      const updated = JSON.parse(JSON.stringify(conditions));
      updated.push(condition);
      //console.log(updated);
      setConditions(updated);
      sstore.store(key, updated);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.toolTip}>
        <AppText style={styles.toolTipText}>Swipe left to remove!</AppText>
      </View>
      <AppPicker
        placeholder="Add Condition"
        items={conditionChoices}
        onSelectItem={onSelectItem}
      />
      <FlatList
        data={conditions}
        keyExtractor={(condition) => condition.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.label}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message Selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
            swipeable={true}
          />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  toolTip: {
    alignItems: "center",
  },
  toolTipText: {
    color: colors.primary,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
export default AccountConditions;

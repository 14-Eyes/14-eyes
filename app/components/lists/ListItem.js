import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import AppText from "../AppText";

function ListItem({
  title,
  subTitle,
  image,
  onPress,
  renderRightActions,
  IconComponent,
  iconName = "chevron-right",
  iconLeftColor = colors.dark,
  style,
  titleStyle,
  showChevron = true,
  swipeable = false,
}) {
  
  // function for visible content
  const renderContent = () => (
    <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
      <View style={[styles.container, style]}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}

        <View style={styles.detailsContainer}>
          <View style={styles.inlineRow}>
            <AppText style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.inlineSubTitle} numberOfLines={1}>
                {subTitle}
              </AppText>
            )}
          </View>
        </View>

        {showChevron && (
          <MaterialCommunityIcons
            color={iconLeftColor}
            name={iconName}
            size={30}
          />
        )}
      </View>
    </TouchableHighlight>
  );

  // if no swipe actions wanted, return normal row
  if (!swipeable) return renderContent();

  // swipeable version for delete option
  return (
    <SwipeRow
      rightOpenValue={-70}
      disableRightSwipe
      stopRightSwipe={-120}
      friction={15}
      tension={40}
      previewRowDelay={1000}
      previewOpenValue={-40}
    >
      {/* hidden row */}
      <View style={styles.hiddenRow}>
        <View style={styles.rightActionContainer}>
          {renderRightActions && renderRightActions()}
        </View>
      </View>

      {/* visible Row */}
      {renderContent()}
    </SwipeRow>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 20,
    paddingLeft: 10,
  },
  inlineSubTitle: {
    color: colors.medium,
    fontSize: 14,
    marginLeft: 15,
  },
  subTitle: {
    color: colors.medium,
  },
  hiddenRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: colors.danger,
  },
  rightActionContainer: {
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;

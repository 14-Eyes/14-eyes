import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
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
  iconLeftColor = colors.medium,
  style,
  titleStyle,
  showChevron = true,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          
          {/* NEW inline layout for subtitles */}
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
              size={25}
            />
          )}
          </View>
      </TouchableHighlight>
    </Swipeable>
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
  },
  inlineSubTitle: {
    color: colors.medium,
    fontSize: 14,
    marginLeft: 15,
  },
  subTitle: {
    color: colors.medium,
  },
});

export default ListItem;

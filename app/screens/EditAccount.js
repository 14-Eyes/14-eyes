import React, { useContext, useState } from "react";
import { StyleSheet, View, FlatList, Modal, Text, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EditAccount({ navigation }) {
  const authContext = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const menuItems = [
    {
      title: "Name",
      description: authContext.username, // i don't think the name is set properly? hopefully fixed w new database
      target: "EditAccountName",
    },
    {
      title: "Email",
      description: authContext.user.email,
      target: "EditAccountEmail",
    },
    {
      title: "Change Password",
      target: "EditAccountPassword",
    },
  ];
  // console.log("AuthContext:", authContext);

  // DELETE ACCOUNT
  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    console.log("Account deleted"); // replace this with actual delete logic
  };

  return (
    <Screen style={styles.screen}>
      {/* <View style={styles.container}> */}
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.description}
              titleStyle={{ paddingLeft: 0 }} // removes left padding in this screen only
              onPress={() => navigation.navigate(item.target)}
              IconComponent={null}
              renderRightIcon={() => (
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={28}
                  color={colors.medium}
                />
              )}
            />
          )}
          scrollEnabled={false} // needed to prevent list of options from scrolling
        />
      {/* </View> */}

      <View style={styles.container}>
        <ListItem
          title="Delete Account"
          onPress={() => setShowDeleteModal(true)}
          IconComponent={null}
          showChevron={false}          
          titleStyle={{ color: colors.danger, fontWeight: "bold", paddingLeft: 0 }}        
        />
      </View>

      {/* Delete confirmation modal pop-up screen */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.confirmText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    // paddingTop: 20,
  },
  container: {
    marginVertical: 60,
  },
  // Modal styles for delete pop-up
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: colors.medium,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: colors.light,
  },
  confirmButton: {
    backgroundColor: colors.danger,
  },
  cancelText: {
    color: colors.dark,
    fontSize: 19,
  },
  confirmText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 19,
  },
});

export default EditAccount;
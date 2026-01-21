import React, { useState, useContext } from "react";
import { StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import colors from "../config/colors";

import AuthContext from "../auth/context";
import { db, auth } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const validationSchema = Yup.object().shape({
  newName: Yup.string().required().label("New Name"),
});

function ChangeNameScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [successVisible, setSuccessVisible] = useState(false);

  const handleSubmit = async ({ newName }) => {
    try {
      const trimmedName = newName.trim();

      const userDocRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userDocRef, { name: trimmedName });

      setUser({
        ...user,
        displayName: trimmedName,
      });

      setSuccessVisible(true);
    } catch (err) {
      console.log("NAME UPDATE ERROR:", err);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.tooltip}>
        Your current name is {user?.displayName || "Not set"}.
      </AppText>

      <AppForm
        initialValues={{ newName: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="newName"
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          placeholder="New Name"
        />

        <SubmitButton title="Save" />
      </AppForm>

      {/* Success Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>
              Your name has been updated.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSuccessVisible(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  tooltip: {
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ChangeNameScreen;

import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import ErrorMessage from "../components/forms/ErrorMessage";
import colors from "../config/colors";

import AuthContext from "../auth/context";
import { auth, db } from "../config/firebase";
import { updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().required().email().label("New Email"),
});

function ChangeEmailScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async ({ newEmail }) => {
    setErrorVisible(false);
    setErrorText("");

    try {
      const trimmedEmail = newEmail.trim().toLowerCase();

      // Step 1: Send verification email for the new email
      await verifyBeforeUpdateEmail(auth.currentUser, trimmedEmail);

      // Step 2: Save new email temporarily in Firestore (optional)
      await updateDoc(doc(db, "users", user.uid), {
        pendingEmail: trimmedEmail,
      });

      // Step 3: Show success modal
      setShowSuccess(true);
    } catch (err) {
      console.log("EMAIL UPDATE ERROR:", err);
      setErrorVisible(true);
      setErrorText("Unable to update email. Try again.");
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.tooltip}>
        Your current email is {user.email}.
      </AppText>
      <AppText style={styles.tooltip}>Enter your new email.</AppText>

      <AppForm
        initialValues={{ newEmail: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage visible={errorVisible} error={errorText} />

        <AppFormField
          name="newEmail"
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          placeholder="New Email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <SubmitButton title="Save" />
      </AppForm>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalText}>
              A verification link has been sent to your new email. Open the link
              to confirm the change.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowSuccess(false);
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
    textAlign: "center",
    marginBottom: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    padding: 22,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 18,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default ChangeEmailScreen;

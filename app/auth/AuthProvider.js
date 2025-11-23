import React, { useContext, useState } from "react";
import { StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import ErrorMessage from "../components/forms/ErrorMessage";
import colors from "../config/colors";

import AuthContext from "../auth/context";
import { auth, db } from "../config/firebase";
import {
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().required().email().label("New Email"),
  password: Yup.string().required().label("Password"),
});

function ChangeEmailScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const [errorVisible, setErrorVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async ({ newEmail, password }) => {
    const user = auth.currentUser;

    if (!user) {
      setErrorVisible(true);
      return;
    }

    setErrorVisible(false);
    setSubmitting(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, password);

      // Re-authentication is required
      await reauthenticateWithCredential(user, credential);

      const trimmedEmail = newEmail.trim().toLowerCase();

      // Update email in Firebase Auth
      await updateEmail(user, trimmedEmail);

      // Update Firestore
      await setDoc(
        doc(db, "users", user.uid),
        { email: trimmedEmail },
        { merge: true }
      );

      // Update app state instantly
      if (authContext?.setUser) {
        authContext.setUser({ ...auth.currentUser, email: trimmedEmail });
      }

      // Show modal
      setShowSuccess(true);
    } catch (err) {
      console.log("CHANGE EMAIL ERROR:", err);
      setErrorVisible(true);
    }

    setSubmitting(false);
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.tooltip}>
        Your current email is {auth.currentUser?.email}.
      </AppText>
      <AppText style={styles.tooltip}>Enter your new email.</AppText>

      <AppForm
        initialValues={{ newEmail: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          visible={errorVisible}
          error="Unable to update email. Please log out, log back in, and try again."
        />

        <AppFormField
          name="newEmail"
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          placeholder="New Email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        <AppFormField
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Current Password"
          secureTextEntry
        />

        <SubmitButton title={submitting ? "Updating..." : "Save"} />
      </AppForm>

      {/* Success Popup */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>Your email has been updated.</Text>

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
  container: { padding: 10, backgroundColor: colors.white },
  tooltip: {
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: colors.medium,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: colors.primary,
    width: "60%",
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChangeEmailScreen;

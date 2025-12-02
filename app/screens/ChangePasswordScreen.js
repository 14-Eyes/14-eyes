import React, { useContext, useState } from "react";
import { StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import ErrorMessage from "../components/forms/ErrorMessage";
import colors from "../config/colors";

import AuthContext from "../auth/context";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required().label("Current Password"),
  newPassword: Yup.string().required().min(6).label("New Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required()
    .label("Confirm Password"),
});

function ChangePasswordScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const SuccessPopup = ({ title, message, onClose }) => (
    <Modal visible transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const handleSubmit = async ({ currentPassword, newPassword }) => {
    setError("");

    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        setError("No authenticated user.");
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      if (authContext?.setUser) {
        authContext.setUser(auth.currentUser);
      }

      setShowSuccess(true);

    } catch (err) {
      console.log("CHANGE PASSWORD ERROR:", err);

      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Invalid password.");
      } else if (err.code === "auth/requires-recent-login") {
        setError("Please log out and log back in, then try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError("Unable to change password. Please try again.");
      }
    }
  };

  return (
    <>
      <Screen style={styles.container}>
        <AppForm
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage visible={!!error} error={error} />

          <AppText style={styles.label}>Enter current password.</AppText>
          <AppFormField
            name="currentPassword"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Current Password"
            textContentType="password"
          />

          <AppText style={styles.label}>Enter your new password.</AppText>
          <AppFormField
            name="newPassword"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="New Password"
            textContentType="newPassword"
          />

          <AppText style={styles.label}>Re-enter your new password.</AppText>
          <AppFormField
            name="confirmPassword"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock-question"
            placeholder="Confirm New Password"
            textContentType="password"
          />

          <SubmitButton title="Change Password" />
        </AppForm>
      </Screen>

      {showSuccess && (
        <SuccessPopup
          title="Success"
          message="Your password has been updated."
          onClose={() => {
            setShowSuccess(false);
            navigation.goBack();
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 4,
    marginTop: 12,
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
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalMessage: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#E89B63",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;


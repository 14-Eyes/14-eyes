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

function EditAccountPassword() {
  const authContext = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async ({ currentPassword, newPassword }) => {
    setError("");

    try {
      const user = auth.currentUser;

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setShowModal(true);
      console.log("Password updated");
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("Invalid password.");
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

          <AppText style={styles.title}>
            Want to change your password?{"\n"}
            Enter your password information in the below fields. 
            You will be logged out of your account and will need to re-login.
          </AppText>

          <AppText style={styles.label}>Enter current password:</AppText>
          <AppFormField
            name="currentPassword"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Current Password"
          />

          <AppText style={styles.label}>Enter your new password:</AppText>
          <AppFormField
            name="newPassword"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="New Password"
          />

          <AppText style={styles.label}>Re-enter your new password:</AppText>
          <AppFormField
            name="confirmPassword"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock-question"
            placeholder="Confirm New Password"
          />

          <SubmitButton title="Change Password" />
        </AppForm>
      </Screen>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalMessage}>
              Your password has been updated successfully.
            </Text>

            {/* <Text style={styles.modalTitle}>Log Out</Text> */}
            <Text style={styles.modalMessage}>
              You will now be logged out and will need to sign in again using your
              new password.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                setShowModal(false);
                await auth.signOut();
                authContext?.setUser?.(null);
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    marginTop: 12,
  },
  label: {
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 10,
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
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
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

export default EditAccountPassword;
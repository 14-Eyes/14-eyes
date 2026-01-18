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

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

import { doc, updateDoc } from "firebase/firestore";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().required().email().label("New Email"),
  password: Yup.string().required().label("Password"),
});

function ChangeEmailScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleSubmit = async ({ newEmail, password }) => {
  setErrorVisible(false);
  setErrorText("");

  try {
    const trimmedEmail = newEmail.trim().toLowerCase();

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    await reauthenticateWithCredential(auth.currentUser, credential);
    await verifyBeforeUpdateEmail(auth.currentUser, trimmedEmail);
    await auth.currentUser.reload();

    await updateDoc(doc(db, "users", user.uid), {
      pendingEmail: trimmedEmail,
    });

    setShowSuccess(true); // show first popup
  } catch (err) {
    console.log("EMAIL UPDATE ERROR:", err.code, err.message);

    // Friendly error messages
    if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
      setErrorVisible(true);
      setErrorText("Invalid password.");
    } else {
      setErrorVisible(true);
      setErrorText(err.code); // fallback to Firebase error code for other errors
    }
  }
};


  /* ---------- POPUPS ---------- */

  const SuccessPopup = ({ onClose }) => (
    <Modal visible transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Success</Text>
          <Text style={styles.modalText}>
            A verification link has been sent to your new email.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const LogOutPopup = ({ onClose }) => (
    <Modal visible transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Log Out</Text>
          <Text style={styles.modalText}>
            After you confirm the change, you will be logged out and need to sign in again using your new email.
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <Screen style={styles.container}>
      <AppText style={styles.tooltip}>
        Your current email is {user.email}.
      </AppText>

      <AppText style={styles.tooltip}>Enter your new email.</AppText>

      <AppForm
        initialValues={{ newEmail: "", password: "" }}
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
        />

        <AppFormField
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Current Password"
          secureTextEntry
        />

        <SubmitButton title="Save" />
      </AppForm>

      {/* ---------- POPUPS ---------- */}

      {showSuccess && (
        <SuccessPopup
          onClose={() => {
            setShowSuccess(false);
            setShowLogout(true);
          }}
        />
      )}

      {showLogout && (
        <LogOutPopup
          onClose={async () => {
            setShowLogout(false);
            await auth.signOut();
            setUser(null);
          }}
        />
      )}
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

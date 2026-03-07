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
import EditAccount from "./EditAccount";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().required().email().label("New Email"),
  password: Yup.string().required().label("Password"),
});

function EditAccountEmail({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [errorVisible, setErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [showModal, setShowModal] = useState(false);

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

      setShowModal(true);
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setErrorVisible(true);
        setErrorText("Invalid password.");
      } else {
        setErrorVisible(true);
        setErrorText(err.code);
      }
    }
  };

  return (
    <Screen style={styles.container}>
      
      <AppText style={styles.title}>
        Want to change your email?{"\n"} 
        Enter your new email account in the field below.
        A verification link will be sent to your new email's spam inbox, and you will be logged out of your account.
      </AppText>
      
      <AppText style={styles.tooltip}>
        Your current email is {user.email}.{"\n"}
        What would you like to change it to?
      </AppText>

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

        <SubmitButton title="Change Email" />
      </AppForm>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>
              A verification link has been sent to your new email. Make sure to check your spam inbox!
            </Text>

            <Text style={styles.modalText}>
              You will now be logged out and will need
              to sign in again using your new email. 
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                setShowModal(false);
                await auth.signOut();
                setUser(null);
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
  title: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 12,
  },
  tooltip: {
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 20,
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

export default EditAccountEmail;

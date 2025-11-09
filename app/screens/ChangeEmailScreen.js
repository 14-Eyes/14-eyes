// app/screens/ChangeEmailScreen.js
import React from "react";
import { View, Alert, Button, Text, TextInput, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase"; // make sure path matches your project
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  newEmail: Yup.string().email("Invalid email").required("New email required"),
  currentPassword: Yup.string().min(6, "Min 6 chars").required("Current password required"),
});

export default function ChangeEmailScreen({ navigation }) {
  const { user, setUser } = useAuth();

  const handleSubmit = async ({ currentPassword, newEmail }, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        Alert.alert("Not signed in", "Please sign in and try again.");
        setSubmitting(false);
        return;
      }

      // Re-authenticate
      const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);

      // Update email (modular)
      await updateEmail(firebaseUser, newEmail);

      // Send verification to new email
      await sendEmailVerification(firebaseUser);

      // Update local context (keep other fields)
      setUser(prev => ({ ...(prev || {}), email: newEmail, emailVerified: false }));

      Alert.alert("Success", "Email updated. Check your new email for verification.");
      navigation.goBack();
    } catch (error) {
      console.error("ChangeEmail error:", error);
      let message = "Failed to change email. Try again.";
      if (error.code === "auth/wrong-password") message = "Incorrect current password.";
      else if (error.code === "auth/requires-recent-login") message = "Please sign out and sign in again to re-authenticate.";
      else if (error.code === "auth/invalid-email") message = "Invalid new email address.";
      else if (error.code === "auth/email-already-in-use") message = "That email is already in use.";
      Alert.alert("Error", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Email</Text>

      <Formik
        initialValues={{ newEmail: "", currentPassword: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="New email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={handleChange("newEmail")}
              value={values.newEmail}
            />
            {touched.newEmail && errors.newEmail && <Text style={styles.error}>{errors.newEmail}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Current password"
              secureTextEntry
              onChangeText={handleChange("currentPassword")}
              value={values.currentPassword}
            />
            {touched.currentPassword && errors.currentPassword && <Text style={styles.error}>{errors.currentPassword}</Text>}

            <Button title={isSubmitting ? "Updating..." : "Update Email"} onPress={handleSubmit} disabled={isSubmitting} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: { color: "red", marginBottom: 8 },
});

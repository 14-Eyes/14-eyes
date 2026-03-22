import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default function BiometricAuthScreen({ navigation }) {
  const [isSupported, setIsSupported] = useState(false); // device supports biometrics
  const [failedAttempts, setFailedAttempts] = useState(0); // track failed attempts
  const MAX_ATTEMPTS = 3; // fallback to password after this

  // Check if device has biometric hardware and user enrolled biometrics
  useEffect(() => {
    const checkBiometric = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && enrolled) setIsSupported(true);
      else
        Alert.alert(
          "Biometrics not available",
          "Your device does not support Face ID or Fingerprint"
        );
    };

    checkBiometric();
  }, []);

  // Function to authenticate via biometrics
  const authenticate = async () => {
    if (!isSupported) return;

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Use Face ID or Touch ID to login", // friendly message
        fallbackLabel: "Use Password", // fallback button text
        disableDeviceFallback: false, // allow device passcode fallback
      });

      if (result.success) {
        // Reset failed attempts on success
        setFailedAttempts(0);

        // Navigate to SponsoredBy screen after successful login
        navigation.replace("SponsoredBy");
      } else {
        // Increment failed attempts
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);

        if (attempts >= MAX_ATTEMPTS) {
          // After 3 failed attempts, fallback to password
          Alert.alert(
            "Too many failed attempts",
            "Please use your password to login.",
            [{ text: "OK", onPress: () => navigation.replace("Login") }]
          );
        } else {
          Alert.alert(
            "Authentication failed",
            `Attempt ${attempts} of ${MAX_ATTEMPTS}`
          );
        }
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert("Error", "Biometric authentication failed. Please try again.");
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Secure Login</Text>
      <Text style={styles.subtitle}>Use Face ID or Fingerprint</Text>

      {isSupported && (
        <TouchableOpacity style={styles.button} onPress={authenticate}>
          <Text style={styles.buttonText}>Authenticate</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.skipText}>Use Password Instead</Text>
      </TouchableOpacity>
    </Screen>
  );
}

// Styles - matches your existing UI
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  skipText: { marginTop: 20, color: colors.medium },
});
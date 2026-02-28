import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default function BiometricAuthScreen({ navigation }) {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    checkBiometric();
  }, []);

  const checkBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && enrolled) {
      setIsSupported(true);
    } else {
      Alert.alert(
        "Biometrics not available",
        "Your device does not support Face ID or Fingerprint"
      );
    }
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login to ELTR",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      navigation.replace("AppNavigator");
    } else {
      Alert.alert("Authentication failed");
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

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.skipText}>Use Password Instead</Text>
      </TouchableOpacity>
    </Screen>
  );
}

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
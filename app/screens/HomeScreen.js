// screens/HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Test Button" onPress={() => Alert.alert("Button pressed!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, marginBottom: 20 },
});

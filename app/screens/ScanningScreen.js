import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import colors from "../config/colors";
import routes from "../navigation/routes";
import productApi from "../api/products";

function ScanningScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const barcodeScanned = async (barcode) => {
    setLoading(true);
    const response = await productApi.getProduct(barcode);
    setLoading(false);

    navigation.navigate(routes.FOOD_ITEM, response.data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {isFocused && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={barcodeScanned}
        >
          <View style={styles.barcodeBorder}>
            <ActivityIndicator
              animating={loading}
              size="large"
              color={colors.primary}
            />
          </View>
        </Camera>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  barcodeBorder: {
    borderWidth: 5,
    width: "70%",
    height: "30%",
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScanningScreen;

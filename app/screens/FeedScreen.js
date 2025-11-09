// app/screens/FeedScreen.js
import React from "react";
import { View, Text, Button } from "react-native";
export default function FeedScreen({ navigation }) {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Feed</Text>
      <Button title="Go Account" onPress={() => navigation.navigate("Account")} />
    </View>
  );
}

// app/screens/ScanScreen.js
import React from "react";
import { View, Text } from "react-native";
export default function ScanScreen() {
  return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Scan Screen</Text></View>;
}

// app/screens/AccountScreen.js
// You already requested creation earlier; ensure it matches import path

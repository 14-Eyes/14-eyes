import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EditAccount from "../screens/EditAccount";
import EditAccountName from "../screens/EditAccountName";
import EditAccountEmail from "../screens/EditAccountEmail";
import EditAccountPassword from "../screens/EditAccountPassword";
import DeleteAccount from "../screens/DeleteAccount";

const Stack = createStackNavigator();

const AccountDetailsNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="EditAccount"
      component={EditAccount}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditAccountName"
      component={EditAccountName}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditAccountEmail"
      component={EditAccountEmail}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditAccountPassword"
      component={EditAccountPassword}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DeleteAccount"
      component={DeleteAccount}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountDetailsNavigator;

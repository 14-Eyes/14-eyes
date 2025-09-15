import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountDetailsNavigator from "../navigation/AccountDetailsNavigator";
import AccountDetails from "../screens/AccountDetails";
import AccountAllergies from "../screens/AccountAllergies";
import AccountConditions from "../screens/AccountConditions";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountDetails}
      options={{ title: "My Account" }}
    />
    <Stack.Screen
      name="EditAccount"
      component={AccountDetailsNavigator}
      options={{ title: "Account Details" }}
    />
    <Stack.Screen
      name="AccountAllergies"
      component={AccountAllergies}
      options={{ title: "My Allergies" }}
    />
    <Stack.Screen
      name="AccountConditions"
      component={AccountConditions}
      options={{ title: "My Conditions" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;

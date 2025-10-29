import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountDetails from "../screens/AccountDetails";
import EditAccount from "../screens/EditAccount";
import EditAccountName from "../screens/EditAccountName";
import EditAccountEmail from "../screens/EditAccountEmail";
import EditAccountPassword from "../screens/EditAccountPassword";
import AccountAllergies from "../screens/AccountAllergies";
import AccountConditions from "../screens/AccountConditions";
// import DeleteAccount from "../screens/DeleteAccount";

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
      component={EditAccount}
      options={{ title: "Account Center" }}
    />
    <Stack.Screen
      name="EditAccountName"
      component={EditAccountName}
      options={{ title: "Edit Name" }}
    />
    <Stack.Screen
      name="EditAccountEmail"
      component={EditAccountEmail}
      options={{ title: "Edit Email" }}
    />
    <Stack.Screen
      name="EditAccountPassword"
      component={EditAccountPassword}
      options={{ title: "Change Password" }}
    />
    {/* NO LONGER USED - reference EditAccount.js for delete account feature */}
    {/* <Stack.Screen
      name="DeleteAccount"
      component={DeleteAccount}
      options={{ title: "Delete Account" }}
    /> */}
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
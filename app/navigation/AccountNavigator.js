import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getSubScreenHeader } from "./HeaderStyles";

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
      options={({ navigation }) => getSubScreenHeader(navigation, "My Account")}	  
    />
    <Stack.Screen
      name="EditAccount"
      component={EditAccount}
      options={({ navigation }) => getSubScreenHeader(navigation, "Account Center")}	  
    />
    <Stack.Screen
      name="EditAccountName"
      component={EditAccountName}
      options={({ navigation }) => getSubScreenHeader(navigation, "Edit Name")}	  
    />
    <Stack.Screen
      name="EditAccountEmail"
      component={EditAccountEmail}
      options={({ navigation }) => getSubScreenHeader(navigation, "Edit Email")}	  
    />
    <Stack.Screen
      name="EditAccountPassword"
      component={EditAccountPassword}
      options={({ navigation }) => getSubScreenHeader(navigation, "Change Password")}	  
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
      options={({ navigation }) => getSubScreenHeader(navigation, "My Allergies")}	  
    />
    <Stack.Screen
      name="AccountConditions"
      component={AccountConditions}
      options={({ navigation }) => getSubScreenHeader(navigation, "My Conditions")}	  
    />
  </Stack.Navigator>
);

export default AccountNavigator;
import { createStackNavigator } from "@react-navigation/stack";
import { getSubScreenHeader, getSubScreenHeaderBack } from "./HeaderStyles";

import BudgetScreen from "../screens/BudgetScreen";
import BudgetingBasicsScreen from "../screens/BudgetingBasicsScreen";
import SampleBudgetScreen from "../screens/SampleBudgetScreen";
import StoresSalesScreen from "../screens/StoresSalesScreen";
import ChatBot from "../screens/AIChatbot";

const Stack = createStackNavigator();

function BudgetNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BudgetHome"
        component={BudgetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BudgetingBasics"
        component={BudgetingBasicsScreen}
        options={({ navigation }) => getSubScreenHeader(navigation, "Budgeting Basics")}
      />
      <Stack.Screen
        name="SampleBudget"
        component={SampleBudgetScreen}
        options={({ navigation }) => getSubScreenHeaderBack(navigation)}	  
      />
      <Stack.Screen
        name="StoresSales"
        component={StoresSalesScreen}
        options={({ navigation }) => getSubScreenHeader(navigation, "Stores & Sales")}	  
      />
      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
        options={({ navigation }) => getSubScreenHeader(navigation, "AI Assistant")}
        />
    </Stack.Navigator>
  );
}

export default BudgetNavigator;

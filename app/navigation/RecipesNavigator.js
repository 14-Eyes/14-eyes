import { createStackNavigator } from "@react-navigation/stack";
import { getSubScreenHeader, getSubScreenHeaderBack } from "./HeaderStyles";

import RecipesScreen from "../screens/RecipesScreen";
import RecipesWantMore from "../screens/RecipesWantMore";
import RecipesSubScreen from "../screens/RecipesSubScreen";

const Stack = createStackNavigator();

function RecipesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecipesScreenHome"
        component={RecipesScreen}
        options={{ unmountOnBlur: false, headerShown: false }}
      />
      <Stack.Screen
        name="RecipesWantMore"
        component={RecipesWantMore}
        options={({ navigation }) => getSubScreenHeaderBack(navigation)}	  
      />
      <Stack.Screen
        name="RecipesSubScreen"
        component={RecipesSubScreen}
        options={{ unmountOnBlur: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RecipesNavigator;

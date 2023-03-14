import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/home/HomeScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import StaffScreen from "./screens/staff/StaffScreen";
import ContinentScreen from "./screens/continents/ContinentScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./screens/LandingPage";

import { navigationRef } from "./RootNavigation";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AddStaffScreen from "./screens/staff/AddStaffScreen";
import EditStaffScreen from "./screens/staff/EditStaffScreen";

const Stack = createNativeStackNavigator();
const MyNavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "ZAMARA APP",
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerTitle: "ZAMARA APP",
        }}
        component={LoginScreen}
      />
      <Stack.Group>
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen
          name="AddStaff"
          options={{
            headerTitle: "Add Staff",
          }}
          component={AddStaffScreen}
        />
        <Stack.Screen
          name="EditStaff"
          options={{
            headerTitle: "Edit Staff",
          }}
          component={EditStaffScreen}
        />
      </Stack.Group>

      <Stack.Screen name="Continents" component={ContinentScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <MyNavigationStack />
      </NavigationContainer>
    </Provider>
  );
}

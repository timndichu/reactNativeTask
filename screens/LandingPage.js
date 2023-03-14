/* eslint-disable react/prop-types */
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "./home/HomeScreen";
import StaffScreen from "./staff/StaffScreen";
import ContinentScreen from "./continents/ContinentScreen";
import { Alert } from "react-native";

import * as RootNavigation from "../RootNavigation";
import { useDispatch } from "react-redux";
import { signOut } from "../store/auth/auth-reducer";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="SIGN OUT"
        onPress={() =>
          Alert.alert(
            "Sign out",
            "Are you sure you want to logout?",
            [
              { text: "Cancel", onPress: () => console.log("Cancel Pressed!") },
              {
                text: "OK",
                onPress: () => {
                 
                  RootNavigation.replace("Login");
                  dispatch(signOut());
                },
              },
            ],
            { cancelable: false }
          )
        }
      />
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          headerTitle: "ZAMARA APP",
        }}
      />
      <Drawer.Screen name="STAFF" component={StaffScreen} />
      <Drawer.Screen name="CONTINENTS" component={ContinentScreen} />
    </Drawer.Navigator>
  );
};

export default function LandingPage() {
  return (
    <NavigationContainer independent={true}>
      <MyDrawer />
    </NavigationContainer>
  );
}

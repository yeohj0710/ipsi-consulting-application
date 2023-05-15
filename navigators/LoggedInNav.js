import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessagesNav";
import useMe from "../hooks/useMe";
import EditProfileNav from "./EditProfileNav";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  const { data } = useMe();
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Search"
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close-outline" size={30} />
          ),
          headerTitle: "",
        }}
        component={Search}
        /*options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
          tabBarVisible: false,
        }}*/
      >
        {/*() => <SharedStackNav screenName="Search" />*/}
      </Stack.Screen>
      <Stack.Screen
        name="Profile"
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close-outline" size={30} />
          ),
          headerTitle: "",
        }}
        component={Profile}
      />
      <Stack.Screen
        name="EditProfile"
        options={{ headerShown: false }}
        component={EditProfileNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          title: "Upload",
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "white",
          },
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
        component={UploadForm}
      />
      <Stack.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
}

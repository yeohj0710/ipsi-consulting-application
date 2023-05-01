import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessagesNav";
import useMe from "../hooks/useMe";
import EditProfileNav from "./EditProfileNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  const { data } = useMe();
  return data?.me?.mentor ? (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="EditProfileNav"
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
  ) : (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
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

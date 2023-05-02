import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../screens/EditProfile";

const Stack = createStackNavigator();

export default function EditProfileNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "black",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="프로필 수정"
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="chevron-down" size={30} />
          ),
          headerTitle: "프로필 수정",
        }}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}

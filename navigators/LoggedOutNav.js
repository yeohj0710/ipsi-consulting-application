import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import ChooseMode from "../screens/ChooseMode";
import InputLogin from "../screens/InputLogin";
import InputName from "../screens/InputName";
import InputPhone from "../screens/InputPhone";
import InputMentor from "../screens/InputMentor";
import InputMentee from "../screens/InputMentee";
import SuccessJoin from "../screens/SuccessJoin";

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="ChooseMode" component={ChooseMode} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="InputLogin" component={InputLogin} />
      <Stack.Screen name="InputName" component={InputName} />
      <Stack.Screen name="InputPhone" component={InputPhone} />
      <Stack.Screen name="InputMentor" component={InputMentor} />
      <Stack.Screen name="InputMentee" component={InputMentee} />
      <Stack.Screen name="SuccessJoin" component={SuccessJoin} />
      <Stack.Screen name="LogIn" component={LogIn} />
    </Stack.Navigator>
  );
}

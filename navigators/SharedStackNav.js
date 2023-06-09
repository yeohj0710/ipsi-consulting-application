import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import SelectedMentee from "../screens/SelectedMentee";
import Consults from "../screens/Consults";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "white",
        },
        headerTitleAlign: "center",
        headerMode: "screen",
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          /*options={{
            headerTitle: () => (
              <Image
                style={{ width: 120, height: 40 }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}*/
        />
      ) : null}
      {screenName === "SelectedMentee" ? (
        <Stack.Screen name={"SelectedMentee"} component={SelectedMentee} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}
      {screenName === "Consults" ? (
        <Stack.Screen name={"Consults"} component={Consults} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}

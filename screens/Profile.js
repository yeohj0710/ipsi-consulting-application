import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfile from "../components/UserProfile";

export default function Profile({ navigation, route }) {
  const user = route?.params?.user;
  useEffect(() => {
    if (route?.params?.user) {
      navigation.setOptions({
        title: user.name,
      });
    }
  }, []);
  return <UserProfile user={user} />;
}

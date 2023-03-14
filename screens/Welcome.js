import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const HeaderText = styled.Text`
  color: black;
  font-weight: 600;
  font-size: 20px;
  margin-top: -50%;
  margin-bottom: 50%;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () =>
    navigation.navigate("LogIn", {
      username: "asdf",
      password: "qwer",
    });
  return (
    <AuthLayout>
      <HeaderText>반갑습니다!</HeaderText>
      <AuthButton
        text="회원가입"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>로그인</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}

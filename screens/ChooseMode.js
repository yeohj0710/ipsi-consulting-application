import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const Container = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20%;
`;

const Logo = styled.Image`
  width: 60%;
`;

const MentorButton = styled.TouchableOpacity`
  width: 70%;
  height: 80px;
  padding: 15px 10px;
  margin-bottom: 30px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const LogInContainer = styled.View`
  align-items: center;
  margin-top: 10px;
`;

const LogIn = styled.TouchableOpacity``;

const LogInText = styled.Text`
  font-weight: 600;
`;

export let mentor = true;

export default function ChooseMode({ navigation }) {
  return (
    <>
      <Container>
        <Logo source={require("../assets/logo.png")} resizeMode="contain" />
        <MentorButton
          style={{ backgroundColor: colors.darkMint }}
          onPress={() => {
            mentor = true;
            navigation.navigate("InputLogin");
          }}
        >
          <ButtonText>멘토로 시작하기</ButtonText>
        </MentorButton>
        <MentorButton
          style={{ backgroundColor: colors.navy }}
          onPress={() => {
            mentor = false;
            navigation.navigate("InputLogin");
          }}
        >
          <ButtonText>멘티로 시작하기</ButtonText>
        </MentorButton>
      </Container>
      <LogInContainer>
        <LogIn onPress={() => navigation.navigate("LogIn")}>
          <LogInText>기존 아이디로 로그인하기</LogInText>
        </LogIn>
      </LogInContainer>
    </>
  );
}

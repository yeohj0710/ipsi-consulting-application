import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: white;
`;

const Logo = styled.Image`
  margin-top: 20%;
  width: 60%;
`;

const Separator = styled.View`
  margin: 20px 0px 30px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgb(219, 219, 219);
`;

const Or = styled.Text`
  margin: 0px 10px;
  font-size: 17px;
  font-weight: 400;
  color: #8e8e8e;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  height: 55px;
  margin-bottom: 20px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #555555;
  font-size: 20px;
`;

export let mentor = true;

export default function ChooseMode({ navigation }) {
  return (
    <Container>
      <Logo source={require("../assets/logo.png")} resizeMode="contain" />
      <Button
        style={{ backgroundColor: colors.lightgray }}
        onPress={() => {
          mentor = true;
          navigation.navigate("InputLogin");
        }}
      >
        <ButtonText>멘토로 시작하기</ButtonText>
      </Button>
      <Button
        style={{ backgroundColor: colors.lightgray }}
        onPress={() => {
          mentor = false;
          navigation.navigate("InputLogin");
        }}
      >
        <ButtonText>멘티로 시작하기</ButtonText>
      </Button>
      <Separator>
        <Line />
        <Or>or</Or>
        <Line />
      </Separator>
      <Button
        style={{ backgroundColor: "#333333" }}
        onPress={() => navigation.navigate("LogIn")}
      >
        <ButtonText style={{ color: "white" }}>
          기존 아이디로 로그인하기
        </ButtonText>
      </Button>
    </Container>
  );
}

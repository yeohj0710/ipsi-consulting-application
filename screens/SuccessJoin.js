import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { mentor } from "./ChooseMode";
import { exName } from "./InputName";

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: white;
`;

const Logo = styled.Image`
  width: 60%;
  margin-top: 20%;
  margin-bottom: -10%;
`;

const SmallText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const LargeText = styled.Text`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
`;

const Separator = styled.View`
  margin: 20px 0px 20px 0px;
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
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #555555;
  font-size: 20px;
`;

const BottomText = styled.Text`
  color: ${colors.darkMint};
  margin-top: 25px;
  font-size: 14px;
`;

export default function SuccessJoin({ navigation }) {
  return (
    <Container>
      <Logo source={require("../assets/logo.png")} resizeMode="contain" />
      <SmallText>
        {exName} {mentor ? "멘토" : "멘티"}님
      </SmallText>
      <LargeText>가입을 환영합니다</LargeText>
      <Button
        style={{ backgroundColor: colors.lightgray }}
        onPress={() => {
          navigation.navigate("LogIn");
        }}
      >
        <ButtonText>로그인으로 이동하기</ButtonText>
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
          {mentor ? "학력 인증하기" : "프로필 작성하기"}
        </ButtonText>
      </Button>
      <BottomText>
        {mentor
          ? "학력을 인증하면 더 자유롭게 활동할 수 있어요."
          : "프로필을 구체적으로 작성하여 적합한 멘토를 찾아보세요."}
      </BottomText>
    </Container>
  );
}

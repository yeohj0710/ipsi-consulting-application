import React from "react";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { colors } from "../colors";
import AuthLayOut from "../components/auth/AuthLayout";
import { mentor } from "./ChooseMode";

const CircleContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const ColoredCircle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  margin-right: 10px;
`;

const Circle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: #aaaaaa;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const NextButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 15px;
  background-color: ${colors.darkMint};
  margin-top: 20%;
  align-items: center;
  justify-content: center;
`;

const NextButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export default function InputName({ navigation }) {
  return (
    <AuthLayOut>
      <CircleContainer>
        <ColoredCircle
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        />
        <ColoredCircle
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        />
        <Circle />
        <Circle />
      </CircleContainer>
      <Title>개인정보 입력하기</Title>
      <SubTitle>이름</SubTitle>
      <TextInput />
      <SubTitle>생년월일 8자리</SubTitle>
      <TextInput />
      <SubTitle>성별</SubTitle>
      <TextInput />
      <NextButton
        style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        onPress={() => navigation.navigate("InputPhone")}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

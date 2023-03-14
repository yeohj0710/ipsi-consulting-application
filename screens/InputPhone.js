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

const PhoneContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CheckButton = styled.TouchableOpacity`
  width: 15%;
  height: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const CheckButtonText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 400;
`;

const NextButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 15px;
  margin-top: 20%;
  align-items: center;
  justify-content: center;
`;

const NextButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export default function InputPhone({ navigation }) {
  return (
    <AuthLayOut>
      <CircleContainer>
        <ColoredCircle
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        />
        <ColoredCircle
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        />
        <ColoredCircle
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        />
        <Circle />
      </CircleContainer>
      <Title>개인정보 입력하기</Title>
      <SubTitle>휴대전화번호</SubTitle>
      <PhoneContainer>
        <TextInput style={{ width: "80%" }} />
        <CheckButton
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        >
          <CheckButtonText>인증{"\n"}하기</CheckButtonText>
        </CheckButton>
      </PhoneContainer>
      <SubTitle>인증번호 6자리</SubTitle>
      <TextInput />
      <NextButton
        style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        onPress={() => navigation.navigate("InputMentor")}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

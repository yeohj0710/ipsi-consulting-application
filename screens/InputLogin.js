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
  margin-bottom: 10px;
`;

const Mode = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10%;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const IdContainer = styled.View`
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
  margin-top: 25%;
  align-items: center;
  justify-content: center;
`;

const NextButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export let id = "",
  password = "";

export default function InputLogin({ navigation }) {
  return (
    <AuthLayOut>
      <CircleContainer>
        <ColoredCircle
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        />
        <Circle />
        <Circle />
        <Circle />
      </CircleContainer>
      <Title>로그인 정보 입력하기</Title>
      <Mode style={{ color: mentor ? colors.darkMint : colors.navy }}>
        {mentor ? "멘토" : "멘티"}로 시작하기
      </Mode>
      <SubTitle>아이디</SubTitle>
      <IdContainer>
        <TextInput style={{ width: "80%" }} />
        <CheckButton
          style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        >
          <CheckButtonText>중복{"\n"}확인</CheckButtonText>
        </CheckButton>
      </IdContainer>
      <SubTitle>비밀번호</SubTitle>
      <TextInput />
      <SubTitle>비밀번호 확인</SubTitle>
      <TextInput />
      <NextButton
        style={{ backgroundColor: mentor ? colors.darkMint : colors.navy }}
        onPress={() => navigation.navigate("InputName")}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

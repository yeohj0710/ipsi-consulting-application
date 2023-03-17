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
  margin-bottom: 20%;
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
  align-items: center;
  justify-content: center;
  margin-top: 20%;
`;

const NextButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export default function InputLogin({ navigation }) {
  const color = mentor ? colors.darkMint : colors.navy;
  return (
    <AuthLayOut>
      <CircleContainer>
        <ColoredCircle style={{ backgroundColor: color }} />
        <ColoredCircle style={{ backgroundColor: color }} />
        <ColoredCircle style={{ backgroundColor: color }} />
        <Circle />
      </CircleContainer>
      <Title>개인정보 인증하기</Title>
      <Mode style={{ color: color }}>
        {mentor ? "멘토" : "멘티"}로 시작하기
      </Mode>
      <IdContainer>
        <TextInput
          style={{ width: "80%", marginBottom: "20%" }}
          color={color}
          placeholder="휴대전화번호 (예시 : 01012345678)"
        />
        <CheckButton style={{ backgroundColor: color }}>
          <CheckButtonText>중복{"\n"}확인</CheckButtonText>
        </CheckButton>
      </IdContainer>
      <TextInput
        style={{ marginBottom: "20%" }}
        color={color}
        placeholder="인증번호"
      />
      <NextButton
        style={{ backgroundColor: color }}
        onPress={() => {
          if (mentor) navigation.navigate("InputMentor");
          else navigation.navigate("InputMentee");
        }}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

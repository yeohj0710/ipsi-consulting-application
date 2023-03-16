import React from "react";
import styled from "styled-components/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
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

export let id = "",
  password = "";

export default function InputLogin({ navigation }) {
  const color = mentor ? colors.darkMint : colors.navy;
  return (
    <AuthLayOut>
      <CircleContainer>
        <ColoredCircle style={{ backgroundColor: color }} />
        <ColoredCircle style={{ backgroundColor: color }} />
        <Circle />
        <Circle />
      </CircleContainer>
      <Title>개인정보 입력하기</Title>
      <Mode style={{ color: color }}>
        {mentor ? "멘토" : "멘티"}로 시작하기
      </Mode>
      <TextInput
        style={{ marginBottom: "20%" }}
        color={color}
        placeholder="이름"
      />
      <TextInput
        style={{ marginBottom: "20%" }}
        color={color}
        placeholder="생년월일 8자리 (예시 : 20230101)"
      />
      <BouncyCheckbox
        size={25}
        fillColor={color}
        unfillColor="#FFFFFF"
        text="Circle Checkbox"
        iconStyle={{ borderColor: color }}
      />
      <Input type="checkbox" />
      <NextButton
        style={{ backgroundColor: color }}
        onPress={() => navigation.navigate("InputPhone")}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

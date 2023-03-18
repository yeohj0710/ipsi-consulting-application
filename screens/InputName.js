import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { colors } from "../colors";
import AuthLayOut from "../components/auth/AuthLayout";
import { mentor } from "./ChooseMode";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";

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

export let exName = "",
  exBirth = "",
  exGender = "";

export default function InputLogin({ navigation }) {
  const color = mentor ? colors.darkMint : colors.navy;
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const genderData = [
    {
      id: 0,
      text: "남성",
    },
    {
      id: 1,
      text: "여성",
    },
  ];
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
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ marginBottom: "20%" }}
        color={color}
        placeholder="생년월일 8자리 (예시 : 20230101)"
        onChangeText={(text) => setBirth(text)}
      />
      <BouncyCheckboxGroup
        checkboxProps={{
          textStyle: { textDecorationLine: "none" },
          style: { marginRight: "20%" },
        }}
        data={genderData}
        onChange={(selectedItem) => {
          if (selectedItem.id === 0) setGender("male");
          else if (selectedItem.id === 1) setGender("female");
        }}
      />
      <NextButton
        style={{ backgroundColor: color }}
        onPress={() => {
          exName = name;
          exBirth = birth;
          exGender = gender;
          navigation.navigate("InputPhone");
        }}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

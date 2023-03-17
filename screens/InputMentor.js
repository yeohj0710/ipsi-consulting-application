import React from "react";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { colors } from "../colors";
import AuthLayOut from "../components/auth/AuthLayout";
import { mentor } from "./ChooseMode";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { username, password } from "./InputLogin";
import { birth, gender, name } from "./InputName";
import { phoneNumber } from "./InputPhone";

const CREATE_NEW_ACCOUNT_MUTATION = gql`
  mutation createNewAccount(
    $username: String!
    $password: String!
    $name: String!
    $birth: String!
    $gender: String!
    $phoneNumber: String!
  ) {
    createNewAccount(
      username: $username
      password: $password
      name: $name
      birth: $birth
      gender: $gender
      phoneNumber: $phoneNumber
    ) {
      ok
      error
    }
  }
`;

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

const SubTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
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

export default function InputMentor({ navigation }) {
  const color = mentor ? colors.darkMint : colors.navy;
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      createNewAccount: { ok, error },
    } = data;
    console.log(username, password, name, birth, gender, phoneNumber);
    if (ok) {
      navigation.navigate("LogIn");
    } else {
      console.log(error);
    }
  };
  const [createNewAccountMutation] = useMutation(CREATE_NEW_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onValid = (data) => {
    createNewAccountMutation({
      variables: {
        username: username,
        password: password,
        name: name,
        birth: birth,
        gender: gender,
        phoneNumber: phoneNumber,
      },
    });
  };
  return (
    <AuthLayOut>
      <CircleContainer>
        <ColoredCircle style={{ backgroundColor: color }} />
        <ColoredCircle style={{ backgroundColor: color }} />
        <ColoredCircle style={{ backgroundColor: color }} />
        <ColoredCircle style={{ backgroundColor: color }} />
      </CircleContainer>
      <Title>개인정보 인증하기</Title>
      <Mode style={{ color: color }}>
        {mentor ? "멘토" : "멘티"}로 시작하기
      </Mode>
      <TextInput
        style={{ marginBottom: "20%" }}
        color={color}
        placeholder="30분 상담 금액 (1,000원 단위로 입력)"
      />
      <SubTitle>단과대학</SubTitle>
      <BouncyCheckbox
        size={25}
        fillColor={color}
        unfillColor="#FFFFFF"
        text="의과대학"
        iconStyle={{ borderColor: color }}
        marginBottom={50}
      />
      <SubTitle>상담분야</SubTitle>
      <BouncyCheckbox
        size={25}
        fillColor={color}
        unfillColor="#FFFFFF"
        text="대학입시"
        iconStyle={{ borderColor: color }}
        marginBottom={20}
      />
      <NextButton
        style={{ backgroundColor: color }}
        onPress={handleSubmit(onValid)}
      >
        <NextButtonText>완료</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

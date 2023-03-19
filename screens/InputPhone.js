import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { colors } from "../colors";
import AuthLayOut from "../components/auth/AuthLayout";
import { mentor } from "./ChooseMode";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const EXIST_PHONENUMBER_MUTATION = gql`
  mutation existPhoneNumber($phoneNumber: String!) {
    existPhoneNumber(phoneNumber: $phoneNumber) {
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

const PhoneNumberCheck = styled.Text`
  color: ${(props) => props.color};
  margin-bottom: 13%;
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

export let exPhoneNumber = "";

export default function InputPhone({ navigation }) {
  const color = mentor ? colors.darkMint : colors.navy;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberCheckColor, setPhoneNumberCheckColor] = useState("tomato");
  const [phoneNumberCheckMessage, setPhoneNumberCheckMessage] = useState("");
  const { register, handleSubmit, setValue, getValues } = useForm();
  useEffect(() => {
    setPhoneNumberCheckColor("tomato");
    if (phoneNumber.length !== 11 || phoneNumber.substring(0, 3) !== "010") {
      setPhoneNumberCheckMessage(
        "전화번호는 010으로 시작하는 11자리이어야 합니다."
      );
    } else {
      setPhoneNumberCheckMessage("전화번호 중복 확인을 해주세요.");
    }
  }, [phoneNumber]);
  const onCompleted = (data) => {
    const {
      existPhoneNumber: { ok, error },
    } = data;
    if (!ok) {
      setPhoneNumberCheckColor("tomato");
      setPhoneNumberCheckMessage(error);
    } else {
      setPhoneNumberCheckColor("green");
      setPhoneNumberCheckMessage("사용 가능한 전화번호입니다.");
    }
  };
  const [existPhoneNumberMutation] = useMutation(EXIST_PHONENUMBER_MUTATION, {
    onCompleted,
  });
  const onValid = (data) => {
    existPhoneNumberMutation({
      variables: {
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
        <Circle />
      </CircleContainer>
      <Title>개인정보 인증하기</Title>
      <Mode style={{ color: color }}>
        {mentor ? "멘토" : "멘티"}로 시작하기
      </Mode>
      <IdContainer>
        <TextInput
          style={{ width: "80%" }}
          color={color}
          placeholder="휴대전화번호 (예시 : 01012345678)"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <CheckButton
          style={{ backgroundColor: color }}
          onPress={handleSubmit(onValid)}
        >
          <CheckButtonText>중복{"\n"}확인</CheckButtonText>
        </CheckButton>
      </IdContainer>
      <PhoneNumberCheck color={phoneNumberCheckColor}>
        {phoneNumberCheckMessage}
      </PhoneNumberCheck>
      <TextInput
        style={{ marginBottom: "20%" }}
        color={color}
        backgroundColor="gray"
        placeholder="인증번호"
        editable={false}
      />
      <NextButton
        style={{ backgroundColor: color }}
        onPress={() => {
          if (phoneNumberCheckColor === "green") {
            exPhoneNumber = phoneNumber;
            navigation.navigate("InputMentorMentee");
          }
        }}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { colors } from "../colors";
import AuthLayOut from "../components/auth/AuthLayout";
import { mentor } from "./ChooseMode";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const EXIST_USERNAME_MUTATION = gql`
  mutation existUsername($username: String!) {
    existUsername(username: $username) {
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

const UsernameCheck = styled.Text`
  color: ${(props) => props.color};
  margin-bottom: 13%;
`;

const PasswordCheck = styled.Text`
  color: tomato;
  margin-bottom: 20%;
`;

const NextButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

const NextButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export let exUsername = "",
  exPassword = "";

export default function InputLogin({ navigation }) {
  const color = mentor ? colors.darkMint : colors.navy;
  const [username, setUsername] = useState("");
  const [usernameCheckMessage, setUsernameCheckMessage] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [usernameCheckColor, setUsernameCheckColor] = useState("black");
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      existUsername: { ok, error },
    } = data;
    if (ok) {
      setUsernameCheckColor("green");
      setUsernameCheckMessage("사용 가능한 아이디입니다.");
    } else {
      setUsernameCheckColor("tomato");
      setUsernameCheckMessage(error);
    }
  };
  const [existUsernameMutation] = useMutation(EXIST_USERNAME_MUTATION, {
    onCompleted,
  });
  const onValid = (data) => {
    existUsernameMutation({
      variables: {
        username: username,
      },
    });
  };
  return (
    <AuthLayOut>
      <CircleContainer>
        <ColoredCircle style={{ backgroundColor: color }} />
        <Circle />
        <Circle />
        <Circle />
      </CircleContainer>
      <Title>로그인 정보 입력하기</Title>
      <Mode style={{ color: color }}>
        {mentor ? "멘토" : "멘티"}로 시작하기
      </Mode>
      <IdContainer>
        <TextInput
          style={{ width: "80%" }}
          color={color}
          placeholder="아이디"
          onChangeText={(text) => setUsername(text)}
        />
        <CheckButton
          style={{ backgroundColor: color }}
          onPress={handleSubmit(onValid)}
        >
          <CheckButtonText>중복{"\n"}확인</CheckButtonText>
        </CheckButton>
      </IdContainer>
      <UsernameCheck color={usernameCheckColor}>
        {usernameCheckMessage}
      </UsernameCheck>
      <TextInput
        style={{ marginBottom: "5%" }}
        color={color}
        placeholder="비밀번호"
        secureTextEntry={true}
        onChangeText={(text) => setFirstPassword(text)}
      />
      <TextInput
        color={color}
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        onChangeText={(text) => setSecondPassword(text)}
      />
      <PasswordCheck>{passwordCheckMessage}</PasswordCheck>
      <NextButton
        style={{ backgroundColor: color }}
        onPress={() => {
          if (firstPassword !== secondPassword)
            setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
          else {
            exUsername = username;
            exPassword = firstPassword;
            navigation.navigate("InputName");
          }
        }}
      >
        <NextButtonText>다음</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

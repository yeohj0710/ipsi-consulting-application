import React, { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { isLoggedInVar, logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayOut from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import styled from "styled-components";
import { colors } from "../colors";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-top: -60%;
`;

const Logo = styled.Image`
  width: 80%;
`;

const LoginMessage = styled.Text`
  font-size: 14px;
  color: tomato;
  margin-bottom: 30px;
`;

export default function LogIn({ route: { params } }) {
  const [loginMessage, setLoginMessage] = useState("");
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    } else {
      setLoginMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayOut>
      <LogoContainer>
        <Logo source={require("../assets/logo.png")} resizeMode="contain" />
      </LogoContainer>
      <TextInput
        value={watch("username")}
        placeholder="아이디"
        returnKeyType="next"
        autoCapitalize={"none"}
        blurOnSubmit={false}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
        color={"black"}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="비밀번호"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        blurOnSubmit={false}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
        color={"black"}
      />
      <LoginMessage>{loginMessage}</LoginMessage>
      <AuthButton
        text="로그인"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayOut>
  );
}

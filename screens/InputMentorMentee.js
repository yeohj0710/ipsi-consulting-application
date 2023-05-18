import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { colors } from "../colors";
import AuthLayOut from "../components/auth/AuthLayout";
import { mentor } from "./ChooseMode";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";
import { exPassword, exUsername } from "./InputLogin";
import { exBirth, exGender, exName } from "./InputName";
import { exPhoneNumber } from "./InputPhone";

const CREATE_NEW_ACCOUNT_MUTATION = gql`
  mutation createNewAccount(
    $mentor: Boolean!
    $username: String!
    $password: String!
    $name: String!
    $birth: String!
    $gender: String!
    $phoneNumber: String!
    $counselPriceLow: Int
    $counselPriceHigh: Int
    $major: String
    $field: String
  ) {
    createNewAccount(
      mentor: $mentor
      username: $username
      password: $password
      name: $name
      birth: $birth
      gender: $gender
      phoneNumber: $phoneNumber
      counselPriceLow: $counselPriceLow
      counselPriceHigh: $counselPriceHigh
      major: $major
      field: $field
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

const CheckBoxContainer = styled.View`
  flex-direction: row;
`;

const NextButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 30%;
`;

const NextButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

export default function InputMentorMentee({ navigation }) {
  const color = mentor ? colors.darkMint : colors.navy;
  const [counselPriceLow, setCounselPriceLow] = useState(0);
  const [counselPriceHigh, setCounselPriceHigh] = useState(0);
  const [major, setMajor] = useState([]);
  const [field, setField] = useState([]);
  const majorData = [
    {
      id: 0,
      text: "의과\n대학",
    },
    {
      id: 1,
      text: "수의과\n대학",
    },
    {
      id: 2,
      text: "한의과\n대학",
    },
    {
      id: 3,
      text: "치과\n대학",
    },
    {
      id: 4,
      text: "약학\n대학",
    },
  ];
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      createNewAccount: { ok, error },
    } = data;
    if (ok) {
      navigation.navigate("SuccessJoin");
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
        mentor: mentor,
        username: exUsername,
        password: exPassword,
        name: exName,
        birth: exBirth,
        gender: exGender,
        phoneNumber: exPhoneNumber,
        counselPriceLow: counselPriceLow,
        counselPriceHigh: counselPriceHigh,
        major: JSON.stringify(major),
        field: JSON.stringify(field),
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
      {mentor ? (
        <>
          <TextInput
            style={{ marginBottom: "20%" }}
            color={color}
            placeholder="30분 상담 금액 (1,000원 단위로 입력)"
            onChangeText={(text) => setCounselPriceLow(Number(text))}
          />
          <TextInput
            style={{ marginBottom: "20%" }}
            color={color}
            placeholder="30분 상담 금액 (1,000원 단위로 입력)"
            onChangeText={(text) => setCounselPriceHigh(Number(text))}
          />
        </>
      ) : (
        <></>
      )}
      <SubTitle>{mentor ? "" : "희망 "}단과대학</SubTitle>
      {mentor ? (
        <BouncyCheckboxGroup
          checkboxProps={{
            textStyle: { textDecorationLine: "none" },
            style: {
              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
              marginLeft: "-3.5%",
              marginBottom: "15%",
            },
          }}
          data={majorData}
          onChange={(selectedItem) => {
            if (selectedItem.id === 0) setMajor([...major, "의과대학"]);
            else if (selectedItem.id === 1) setMajor([...major, "수의과대학"]);
            else if (selectedItem.id === 2) setMajor([...major, "한의과대학"]);
            else if (selectedItem.id === 3) setMajor([...major, "치과대학"]);
            else if (selectedItem.id === 4) setMajor([...major, "약학대학"]);
          }}
        />
      ) : (
        <CheckBoxContainer style={{ marginBottom: 30 }}>
          <BouncyCheckbox
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            textStyle={{ textDecorationLine: "none" }}
            marginLeft={"-2%"}
            fillColor={color}
            unfillColor="#FFFFFF"
            text={"의과\n대학"}
            iconStyle={{ borderColor: color }}
            onPress={(isChecked) => {
              if (isChecked) {
                setMajor([...major, "의과대학"]);
              } else {
                setMajor(major.filter((ele) => ele !== "의과대학"));
              }
            }}
          />
          <BouncyCheckbox
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            textStyle={{ textDecorationLine: "none" }}
            marginLeft={"-3.5%"}
            fillColor={color}
            unfillColor="#FFFFFF"
            text={"수의과\n대학"}
            iconStyle={{ borderColor: color }}
            onPress={(isChecked) => {
              if (isChecked) {
                setMajor([...major, "수의과대학"]);
              } else {
                setMajor(major.filter((ele) => ele !== "수의과대학"));
              }
            }}
          />
          <BouncyCheckbox
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            textStyle={{ textDecorationLine: "none" }}
            marginLeft={"-3.5%"}
            fillColor={color}
            unfillColor="#FFFFFF"
            text={"한의과\n대학"}
            iconStyle={{ borderColor: color }}
            onPress={(isChecked) => {
              if (isChecked) {
                setMajor([...major, "한의과대학"]);
              } else {
                setMajor(major.filter((ele) => ele !== "한의과대학"));
              }
            }}
          />
          <BouncyCheckbox
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            textStyle={{ textDecorationLine: "none" }}
            marginLeft={"-3.5%"}
            fillColor={color}
            unfillColor="#FFFFFF"
            text={"치과\n대학"}
            iconStyle={{ borderColor: color }}
            onPress={(isChecked) => {
              if (isChecked) {
                setMajor([...major, "치과대학"]);
              } else {
                setMajor(major.filter((ele) => ele !== "치과대학"));
              }
            }}
          />
          <BouncyCheckbox
            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            textStyle={{ textDecorationLine: "none" }}
            marginLeft={"-3.5%"}
            fillColor={color}
            unfillColor="#FFFFFF"
            text={"약학\n대학"}
            iconStyle={{ borderColor: color }}
            onPress={(isChecked) => {
              if (isChecked) {
                setMajor([...major, "약학대학"]);
              } else {
                setMajor(major.filter((ele) => ele !== "약학대학"));
              }
            }}
          />
        </CheckBoxContainer>
      )}
      <SubTitle>{mentor ? "" : "희망 "}상담분야</SubTitle>
      <CheckBoxContainer>
        <BouncyCheckbox
          style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          textStyle={{ textDecorationLine: "none" }}
          marginLeft={"-2%"}
          fillColor={color}
          unfillColor="#FFFFFF"
          text={"학습\n코칭"}
          iconStyle={{ borderColor: color }}
          onPress={(isChecked) => {
            if (isChecked) {
              setField([...field, "학습코칭"]);
            } else {
              setField(field.filter((ele) => ele !== "학습코칭"));
            }
          }}
        />
        <BouncyCheckbox
          style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          textStyle={{ textDecorationLine: "none" }}
          marginLeft={"-2%"}
          fillColor={color}
          unfillColor="#FFFFFF"
          text={"대학\n입시"}
          iconStyle={{ borderColor: color }}
          onPress={(isChecked) => {
            if (isChecked) {
              setField([...field, "대학입시"]);
            } else {
              setField(field.filter((ele) => ele !== "대학입시"));
            }
          }}
        />
        <BouncyCheckbox
          style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          textStyle={{ textDecorationLine: "none" }}
          marginLeft={"-2%"}
          fillColor={color}
          unfillColor="#FFFFFF"
          text={"대학원"}
          iconStyle={{ borderColor: color }}
          onPress={(isChecked) => {
            if (isChecked) {
              setField([...field, "대학원"]);
            } else {
              setField(field.filter((ele) => ele !== "대학원"));
            }
          }}
        />
        <BouncyCheckbox
          style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          textStyle={{ textDecorationLine: "none" }}
          marginLeft={"-2%"}
          fillColor={color}
          unfillColor="#FFFFFF"
          text={"편입"}
          iconStyle={{ borderColor: color }}
          onPress={(isChecked) => {
            if (isChecked) {
              setField([...field, "편입"]);
            } else {
              setField(field.filter((ele) => ele !== "편입"));
            }
          }}
        />
        <BouncyCheckbox
          style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          textStyle={{ textDecorationLine: "none" }}
          marginLeft={"-2%"}
          fillColor={color}
          unfillColor="#FFFFFF"
          text={"진로\n전공"}
          iconStyle={{ borderColor: color }}
          onPress={(isChecked) => {
            if (isChecked) {
              setField([...field, "진로전공"]);
            } else {
              setField(field.filter((ele) => ele !== "진로전공"));
            }
          }}
        />
      </CheckBoxContainer>
      <NextButton
        style={{ backgroundColor: color }}
        onPress={() => {
          handleSubmit(onValid)();
        }}
      >
        <NextButtonText>완료</NextButtonText>
      </NextButton>
    </AuthLayOut>
  );
}

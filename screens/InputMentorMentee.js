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
    $counselPrice: Int
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
      counselPrice: $counselPrice
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
  const [counselPrice, setCounselPrice] = useState(0);
  const [major, setMajor] = useState("");
  const [list, setList] = useState([]);
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
        counselPrice: counselPrice,
        major: major,
        field: JSON.stringify(list),
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
        <TextInput
          style={{ marginBottom: "20%" }}
          color={color}
          placeholder="30분 상담 금액 (1,000원 단위로 입력)"
          onChangeText={(text) => setCounselPrice(Number(text))}
        />
      ) : (
        <></>
      )}
      <SubTitle>{mentor ? "" : "희망 "}단과대학</SubTitle>
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
          if (selectedItem.id === 0) setMajor("의과대학");
          else if (selectedItem.id === 1) setMajor("수의과대학");
          else if (selectedItem.id === 2) setMajor("한의과대학");
          else if (selectedItem.id === 3) setMajor("치과대학");
          else if (selectedItem.id === 4) setMajor("약학대학");
        }}
      />
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
              setList([...list, "학습코칭"]);
            } else {
              setList(list.filter((ele) => ele !== "학습코칭"));
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
              setList([...list, "대학입시"]);
            } else {
              setList(list.filter((ele) => ele !== "대학입시"));
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
              setList([...list, "대학원"]);
            } else {
              setList(list.filter((ele) => ele !== "대학원"));
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
              setList([...list, "편입"]);
            } else {
              setList(list.filter((ele) => ele !== "편입"));
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
              setList([...list, "진로전공"]);
            } else {
              setList(list.filter((ele) => ele !== "진로전공"));
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

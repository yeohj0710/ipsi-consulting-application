import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import { mentor } from "./ChooseMode";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ProfileContainer = styled.View`
  margin-top: 20px;
  margin-left: 20px;
`;

const ProfileImg = styled.Image`
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 50px;
`;

const Title = styled.Text`
  color: black;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ProfileText = styled.Text`
  color: black;
  font-size: 15px;
  margin-bottom: 5px;
`;

const EditButton = styled.TouchableOpacity`
  width: 25%;
  height: 50px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  border-radius: 5px;
`;

const EditButtonText = styled.Text`
  color: black;
  font-size: 15px;
`;

export default function Me({ navigation }) {
  const [image, setImage] = useState(null);
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <Container>
      <ProfileContainer>
        <Title>프로필</Title>
        {data?.me?.avatar ? (
          <ProfileImg source={{ uri: image ? image : data?.me?.avatar }} />
        ) : (
          <ProfileImg
            source={image ? { uri: image } : require("../assets/profile.png")}
          />
        )}
        <ProfileText>
          {data?.me?.mentor ? "멘토" : "멘티"} {data?.me?.name}
        </ProfileText>
        <ProfileText>{data?.me?.bio}</ProfileText>
        <ProfileText>
          {mentor ? "" : "희망 단과대학 : "}
          {data?.me?.major}
        </ProfileText>
        <ProfileText>생일 : {data?.me?.birth}</ProfileText>
        <ProfileText>
          성별 : {data?.me?.gender === "male" ? "남" : "여"}
        </ProfileText>
        {mentor ? (
          <ProfileText>
            상담 희망 금액 (30분) : {data?.me?.counselPrice}원
          </ProfileText>
        ) : (
          ""
        )}
        <EditButton onPress={() => navigation.navigate("EditProfile")}>
          <EditButtonText>프로필 수정</EditButtonText>
        </EditButton>
      </ProfileContainer>
    </Container>
  );
}

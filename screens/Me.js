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

const SubContainer1 = styled.View`
  flex-direction: row;
`;

const SubContainer2 = styled.View`
  flex-direction: column;
`;

const ProfileImg = styled.Image`
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
  margin-right: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 50px;
`;

const Title = styled.Text`
  color: black;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const NameText = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const ProfileText = styled.Text`
  color: black;
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 2px;
`;

const EditButton = styled.TouchableOpacity`
  width: 120px;
  height: 35px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  border-radius: 5px;
  border: 1px solid #eeeeee;
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
        <SubContainer1>
          {data?.me?.avatar ? (
            <ProfileImg source={{ uri: image ? image : data?.me?.avatar }} />
          ) : (
            <ProfileImg
              source={image ? { uri: image } : require("../assets/profile.png")}
            />
          )}
          <SubContainer2>
            <NameText>
              {data?.me?.mentor ? "멘토" : "멘티"} {data?.me?.name}{" "}
            </NameText>
            <ProfileText>{data?.me?.bio}</ProfileText>
            <EditButton onPress={() => navigation.navigate("EditProfile")}>
              <EditButtonText>프로필 수정</EditButtonText>
            </EditButton>
          </SubContainer2>
        </SubContainer1>
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
      </ProfileContainer>
    </Container>
  );
}

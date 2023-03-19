import React, { useEffect } from "react";
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

export default function Me({ navigation }) {
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
        <ProfileText>
          {data?.me?.mentor ? "멘토" : "멘티"} {data?.me?.name}
        </ProfileText>
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

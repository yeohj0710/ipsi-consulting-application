import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import useMe from "../hooks/useMe";
import styled from "styled-components";
import { colors } from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Update from "expo-updates";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 35px;
  background-color: white;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const SmallContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1.2px solid ${colors.darkMint};
  border-radius: 10px;
`;

const ProfileImg = styled.Image`
  height: 70px;
  width: 70px;
  margin: 10px;
  border: 1px solid #c3c3c3;
  border-radius: 35px;
`;

const ProfileInfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const ProfileMajor = styled.Text`
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const ProfileText = styled.Text`
  font-size: 14px;
  color: gray;
`;

const Box = styled.View`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  // border: 1.2px solid ${colors.darkMint};
  border-radius: 10px;
`;

const SmallBox1 = styled.View`
  width: 31%;
  height: 80px;
  margin: 10px 15px 10px 0px;
  background-color: #eeeeee;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const SmallBox2 = styled.View`
  width: 31%;
  height: 80px;
  margin: 10px 15px 10px 0px;
  background-color: ${colors.darkMint};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const SmallBox3 = styled.View`
  width: 31%;
  height: 80px;
  margin: 10px 10px 10px 0px;
  background-color: #eeeeee;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const BoldText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const GrayText = styled.Text`
  font-size: 14px;
  color: gray;
`;

const LogoutButton = styled.TouchableOpacity`
  width: 120px;
  height: 35px;
  margin-top: 50px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  border-radius: 5px;
  align-self: center;
`;

const LogoutButtonText = styled.Text`
  color: black;
  font-size: 15px;
`;

export default function Feed({ navigation }) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="white" size={20} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  const { data: meData } = useMe();
  return (
    <ScreenLayout loading={loading}>
      <Container>
        <Name>{meData?.me?.name} 멘토님</Name>
        <Title>멘티 찾기</Title>
        <SmallContainer>
          <Ionicons
            style={{ margin: 12 }}
            name={"search"}
            color={"gray"}
            size={22}
          />
          <ProfileText style={{ marginTop: 14 }}>멘티 찾기</ProfileText>
        </SmallContainer>
        <Title>프로필 미리보기</Title>
        <SmallContainer>
          {meData?.me?.avatar ? (
            <ProfileImg source={{ uri: meData?.me?.avatar }} />
          ) : (
            <ProfileImg source={require("../assets/profile.png")} />
          )}
          <ProfileInfoContainer>
            <ProfileMajor>{meData?.me?.major}</ProfileMajor>
            <ProfileText>
              30분 상담 금액 : {meData?.me?.counselPrice}원
            </ProfileText>
            <ProfileText>
              상담분야 :{" "}
              {meData?.me?.field ? JSON.parse(meData?.me?.field) : ""}
            </ProfileText>
          </ProfileInfoContainer>
        </SmallContainer>
        {/*
        <FindMentee onPress={() => navigation.navigate("Search")}>
          <FindMenteeText>멘티 찾기</FindMenteeText>
        </FindMentee>
        */}
        <Title>받은 요청</Title>
        <Title>상담 내역</Title>
        <Box>
          <SmallBox1>
            <BoldText>0</BoldText>
            <GrayText>전체</GrayText>
          </SmallBox1>
          <SmallBox2>
            <BoldText style={{ color: "white" }}>0</BoldText>
            <GrayText style={{ color: "white" }}>예정 상담</GrayText>
          </SmallBox2>
          <SmallBox3>
            <BoldText>0</BoldText>
            <GrayText>완료 상담</GrayText>
          </SmallBox3>
        </Box>
        <GrayText style={{ textAlign: "center" }}>
          오늘 OO시 OO분에 상담이 예정되어 있어요.
        </GrayText>
        <LogoutButton
          onPress={async () => {
            await AsyncStorage.clear();
            Update.reloadAsync();
          }}
        >
          <LogoutButtonText>로그아웃</LogoutButtonText>
        </LogoutButton>
      </Container>
      {/* 
      <FlatList
        onEndReachedThreshold={0.8}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtrsor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
      */}
    </ScreenLayout>
  );
}

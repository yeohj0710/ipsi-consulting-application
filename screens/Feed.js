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

const ProfileContainer = styled.View`
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

const ProfileMajor = styled.Text`
  font-weight: 500;
  margin-top: 10px;
  margin-left: 10px;
`;

const FindMentee = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  margin-top: 30px;
  padding-left: 20px;
  border: 1.2px solid ${colors.darkMint};
  border-radius: 10px;
  justify-content: center;
`;

const FindMenteeText = styled.Text`
  font-size: 13px;
  color: gray;
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
        <Title>프로필 미리보기</Title>
        <ProfileContainer>
          {meData?.me?.avatar ? (
            <ProfileImg source={{ uri: meData?.me?.avatar }} />
          ) : (
            <ProfileImg source={require("../assets/profile.png")} />
          )}
          <ProfileMajor>{meData?.me?.major}</ProfileMajor>
        </ProfileContainer>
        {/*
        <FindMentee onPress={() => navigation.navigate("Search")}>
          <FindMenteeText>멘티 찾기</FindMenteeText>
        </FindMentee>
        */}
        <Title>받은 요청</Title>
        <Title>상담 내역</Title>
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

import { gql, useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";

const SEE_USERS = gql`
  query seeUsers($value: Boolean!) {
    seeUsers(value: $value) {
      id
      mentor
      username
      name
      birth
      gender
      phoneNumber
      counselPrice
      major
      field
      bio
      avatar
      createdAt
      updatedAt
      isMe
    }
  }
`;

const TitleContainer = styled.View`
  align-self: flex-start;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const UserContainer = styled.TouchableOpacity`
  margin: 0px 20px 10px 20px;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  flex-direction: row;
`;

const ProfileImg = styled.Image`
  height: 80px;
  width: 80px;
  margin-right: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 40px;
`;

const InfoContainer = styled.TouchableOpacity`
  flex-direction: column;
`;

const BoldText = styled.Text`
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const GrayText = styled.Text`
  font-size: 14px;
  color: gray;
`;

export default function Search({ navigation }) {
  const { data, loading, refetch, fetchMore } = useQuery(SEE_USERS, {
    variables: {
      value: true,
    },
  });
  const renderItem = ({ item: user }) => (
    <UserContainer>
      <ProfileImg
        source={
          user.avatar ? { uri: user.avatar } : require("../assets/profile.png")
        }
      />
      <InfoContainer>
        <BoldText>{user.name}</BoldText>
        <GrayText>단과대학 : {user.major}원</GrayText>
        <GrayText>
          상담분야 : {user.field ? JSON.parse(user.field) : ""}
        </GrayText>
      </InfoContainer>
    </UserContainer>
  );
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
  return (
    <ScreenLayout loading={loading}>
      <TitleContainer>
        <Title>멘토/멘티 찾기</Title>
      </TitleContainer>
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
        data={data?.seeUsers}
        keyExtrsor={(user) => "" + user.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}

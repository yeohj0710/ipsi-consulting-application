import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { colors } from "../colors";
import UserInfo from "../components/UserInfo";

const SEE_USERS = gql`
  query seeUsers($isMentor: Boolean!) {
    seeUsers(isMentor: $isMentor) {
      id
      mentor
      username
      name
      birth
      gender
      phoneNumber
      counselPriceLow
      counselPriceHigh
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
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0px 10px 20px;
`;

const TitleInfo = styled.Text`
  font-size: 12px;
  color: ${colors.darkMint};
  margin-left: 20px;
  margin-bottom: 35px;
`;

const UserContainer = styled.TouchableOpacity`
  margin: 0px 20px 10px 20px;
  padding: 10px;
  padding-right: 30px;
  border: 1px solid ${colors.darkMint};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Search({ navigation }) {
  const { data: meData } = useMe();
  const { data, loading, refetch, fetchMore } = useQuery(SEE_USERS, {
    variables: {
      isMentor: meData?.me?.mentor,
    },
  });
  const renderItem = ({ item: user }) => (
    <UserContainer
      onPress={() => {
        navigation.navigate("Profile", {
          user: user,
        });
      }}
    >
      <UserInfo user={user} />
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
        <Title>{meData?.me?.mentor ? "멘티" : "멘토"} 찾기</Title>
        <TitleInfo>멘티에게 상담을 제안하세요.</TitleInfo>
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
        keyExtractor={(user) => "" + user.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}

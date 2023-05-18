import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, LogBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import useMe from "../hooks/useMe";
import styled from "styled-components";
import { colors } from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Update from "expo-updates";
import { convertField, convertMajor } from "../components/ConvertString";

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
  padding-left: 30px;
  padding-right: 35px;
  background-color: white;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
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
  align-items: center;
  justify-content: space-between;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProfileMajor = styled.Text`
  font-weight: 500;
  margin-bottom: 5px;
`;

const ProfileText = styled.Text`
  font-size: 10px;
  margin-bottom: 2px;
  color: gray;
`;

const CertificationButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-left: 30px;
  margin-right: 10px;
  background-color: ${colors.darkMint};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const CerfiticationButtonText = styled.Text`
  font-size: 12px;
  color: white;
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

const SearchBox = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1.2px solid ${colors.darkMint};
  border-radius: 10px;
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
        <Name>
          {meData?.me?.name} {meData?.me?.mentor ? "멘토" : "멘티"}님
        </Name>
        <Title>프로필 미리보기</Title>
        <SmallContainer>
          {meData?.me?.avatar ? (
            <ProfileImg source={{ uri: meData?.me?.avatar }} />
          ) : (
            <ProfileImg source={require("../assets/profile.png")} />
          )}
          {meData?.me?.mentor ? (
            <ProfileInfoContainer>
              <ProfileMajor>{convertMajor(meData?.me?.major)}</ProfileMajor>
              <ProfileText>OO대학교 OO학과</ProfileText>
              <ProfileText>
                30분 상담 금액 : {meData?.me?.counselPriceLow}
                {" ~ "}
                {meData?.me?.counselPriceHigh}원
              </ProfileText>
              <ProfileText>
                상담분야 : {convertField(meData?.me?.field)}
              </ProfileText>
            </ProfileInfoContainer>
          ) : null}
          <CertificationButton>
            <CerfiticationButtonText>인증{"\n"}하기</CerfiticationButtonText>
          </CertificationButton>
        </SmallContainer>
        {/*
        <FindMentee onPress={() => navigation.navigate("Search")}>
          <FindMenteeText>멘티 찾기</FindMenteeText>
        </FindMentee>
        */}
        {/* <Title>받은 요청</Title> */}
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
        <Title>{meData?.me?.mentor ? "멘티" : "멘토"} 찾기</Title>
        <SearchBox onPress={() => navigation.navigate("Search")}>
          <Ionicons
            style={{ margin: 12 }}
            name={"search"}
            color={"gray"}
            size={22}
          />
        </SearchBox>
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

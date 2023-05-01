import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import * as ImagePicker from "expo-image-picker";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ReactNativeFile } from "apollo-upload-client";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $firstName: String
    $lastName: String
    $username: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      ok
      error
    }
  }
`;

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
  margin: 10px;
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

const CounselPrice = styled.TextInput`
  width: 80%;
  margin: 10px;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 1px solid gray;
  border-radius: 10px;
`;

export default function EditProfile({ navigation }) {
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const { data } = useMe();
  {
    /*useEffect(() => {
      navigation.setOptions({
        title: data?.me?.username,
      });
    }, []);*/
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok) {
      navigation.navigate("Me");
    } else {
      console.log(error);
    }
  };
  const [editProfileMutation] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const onValid = () => {
    let file;
    if (image) {
      file = new ReactNativeFile({
        uri: image,
        name: `1.jpg`,
        type: "Image/jpg",
      });
    }
    editProfileMutation({
      variables: {
        firstName: data?.me?.firstName,
        lastName: data?.me?.lastName,
        username: data?.me?.username,
        password: data?.me?.password,
        bio: data?.me?.bio,
        avatar: file,
      },
    });
  };
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
        <EditButton onPress={pickImage}>
          <EditButtonText>이미지 선택</EditButtonText>
        </EditButton>
        <ProfileText>{data?.me?.bio}</ProfileText>
        <CounselPrice
          returnKeyType="done"
          placeholder="프로필 메시지"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={(text) => setBio(text)}
        />
        <EditButton onPress={() => handleSubmit(onValid)()}>
          <EditButtonText>수정</EditButtonText>
        </EditButton>
      </ProfileContainer>
    </Container>
  );
}

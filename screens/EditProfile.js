import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMe from "../hooks/useMe";
import * as ImagePicker from "expo-image-picker";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ReactNativeFile } from "apollo-upload-client";
import * as Update from "expo-updates";
import { ActivityIndicator } from "react-native";

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
  align-items: center;
`;

const ProfileImg = styled.Image`
  height: 150px;
  width: 150px;
  border: 1px solid #c3c3c3;
  border-radius: 75px;
  margin-bottom: 20px;
`;

const ProfileText = styled.Text`
  color: black;
  font-size: 15px;
  margin: 10px;
`;

const EditButton = styled.TouchableOpacity`
  width: 120px;
  height: 35px;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  border-radius: 5px;
`;

const EditButtonText = styled.Text`
  color: black;
  font-size: 15px;
`;

const BioInput = styled.TextInput`
  width: 80%;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: 1px solid #cccccc;
  border-radius: 10px;
`;

export default function EditProfile({ navigation }) {
  const [loading, setLoading] = useState(false);
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
  const onValid = async () => {
    let file;
    if (image) {
      file = new ReactNativeFile({
        uri: image,
        name: `1.jpg`,
        type: "Image/jpg",
      });
    }
    await editProfileMutation({
      variables: {
        firstName: data?.me?.firstName,
        lastName: data?.me?.lastName,
        username: data?.me?.username,
        password: data?.me?.password,
        bio: bio === "" ? data?.me?.bio : bio,
        avatar: file,
      },
    });
  };
  return (
    <Container>
      <ProfileContainer>
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
        <BioInput
          returnKeyType="done"
          defaultValue={data?.me?.bio}
          placeholder="프로필 메시지"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={(text) => setBio(text)}
        />
        <EditButton
          onPress={async () => {
            setLoading(true);
            await handleSubmit(onValid)();
            Update.reloadAsync();
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <EditButtonText>수정</EditButtonText>
          )}
        </EditButton>
      </ProfileContainer>
    </Container>
  );
}

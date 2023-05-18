import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import { convertField, convertMajor } from "./ConvertString";

const ProfileImg = styled.Image`
  height: 80px;
  width: 80px;
  margin-right: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 40px;
`;

const InfoContainer = styled.View`
  flex-direction: column;
  width: 50%;
`;

const BoldText = styled.Text`
  font-weight: 500;
  margin-bottom: 5px;
`;

const GrayText = styled.Text`
  font-size: 11px;
  color: gray;
`;

const ButtonContainer = styled.View`
  flex-direction: column;
`;

const LikeButton = styled.TouchableOpacity`
  align-self: flex-end;
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
`;

const CertificationButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-left: 30px;
  background-color: ${colors.darkMint};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const CerfiticationButtonText = styled.Text`
  font-size: 12px;
  color: white;
`;

export default function UserInfo({ user }) {
  return (
    <>
      <ProfileImg
        source={
          user.avatar ? { uri: user.avatar } : require("../assets/profile.png")
        }
      />
      <InfoContainer>
        <BoldText>
          {user.name} {user.mentor ? "멘토" : "멘티"}
        </BoldText>
        <GrayText>
          {user.mentor ? "" : "희망 "}단과대학 : {convertMajor(user.major)}
        </GrayText>
        <GrayText>
          {user.mentor ? "" : "희망 "}상담분야 : {convertField(user.field)}
        </GrayText>
        <GrayText>요청 미리보기 : 없음</GrayText>
      </InfoContainer>
      <ButtonContainer>
        <LikeButton>
          <Ionicons name={"heart-outline"} color={"tomato"} size={25} />
        </LikeButton>
        <CertificationButton>
          <CerfiticationButtonText>제안{"\n"}하기</CerfiticationButtonText>
        </CertificationButton>
      </ButtonContainer>
    </>
  );
}

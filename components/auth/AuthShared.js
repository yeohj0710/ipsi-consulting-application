import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  height: 50px;
  padding: 15px 10px;
  border-radius: 4px;
  border: ${(props) => (props.color ? `1px solid ${props.color}` : "0px")};
  margin-bottom: ${(props) => (props.lastOne ? "15" : "8")}px;
`;

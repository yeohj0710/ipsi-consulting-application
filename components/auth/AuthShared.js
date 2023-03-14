import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  height: 50px;
  background-color: rgba(232, 235, 242, 1);
  padding: 15px 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: ${(props) => (props.lastOne ? "15" : "8")}px;
`;

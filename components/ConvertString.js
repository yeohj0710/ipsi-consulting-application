import React from "react";

export default function ConvertMajor({ oldString }) {
  let newString = "";
  if (oldString.includes("의과대학")) newString = "의과대학";
  else if (oldString.includes("수의과대학")) newString = "수의과대학";
  else if (oldString.includes("한의과대학")) newString = "한의과대학";
  else if (oldString.includes("치과대학")) newString = "치과대학";
  else if (oldString.includes("약학대학")) newString = "약학대학";
  else newString = "없음";
  return newString;
}

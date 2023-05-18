import React from "react";

export function convertMajor(oldString) {
  let newString = "";
  if (oldString.includes('"의과대학"')) newString += ", 의과대학";
  if (oldString.includes("수의과대학")) newString += ", 수의과대학";
  if (oldString.includes("한의과대학")) newString += ", 한의과대학";
  if (oldString.includes("치과대학")) newString += ", 치과대학";
  if (oldString.includes("약학대학")) newString += ", 약학대학";
  if (newString === "") return "없음";
  if (newString[0] === ",")
    newString = newString.substring(2, newString.length);
  return newString;
}

export function convertField(oldString) {
  let newString = "";
  if (oldString.includes("학습코칭")) newString += ", 학습코칭";
  if (oldString.includes("대학입시")) newString += ", 대학입시";
  if (oldString.includes("대학원")) newString += ", 대학원";
  if (oldString.includes("편입")) newString += ", 편입";
  if (oldString.includes("진로전공")) newString += ", 진로전공";
  if (newString === "") return "없음";
  if (newString[0] === ",")
    newString = newString.substring(2, newString.length);
  return newString;
}

export function convertBirth(oldString) {
  if (oldString === null) return "없음";
  return (
    oldString.substring(0, 4) +
    "년 " +
    oldString.substring(4, 6) +
    "월 " +
    oldString.substring(6, 8) +
    "일"
  );
}

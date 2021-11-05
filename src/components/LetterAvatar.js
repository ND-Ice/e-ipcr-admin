import React from "react";
import styled from "styled-components";
import getLetterAvatarBg from "../utils/getLetterAvatarBg";

export default function LetterAvatar({ user, size }) {
  return (
    <AvatarContainer size={size} dept={user.dept}>
      <h1>{user.name[0]} </h1>
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
  display: inline-grid;
  place-items: center;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background: ${(props) => getLetterAvatarBg(props.dept)};
  border-radius: 50%;
  cursor: pointer;

  > * {
    font-size: 1.8rem;
    color: white;
  }
`;

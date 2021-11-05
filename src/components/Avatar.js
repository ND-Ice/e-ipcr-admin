import React from "react";
import styled from "styled-components";
import getLetterAvatarBg from "../utils/getLetterAvatarBg";

export default function Avatar({ user }) {
  return (
    <AvatarContainer dept={user?.dept}>
      <UserAvatar src={user?.image} />
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
  display: inline-grid;
  place-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 4px solid ${(props) => getLetterAvatarBg(props.dept)};
`;

const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

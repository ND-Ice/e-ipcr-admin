import React, { useState } from "react";
import styled from "styled-components";
import { FiCheck, FiX } from "react-icons/fi";
import { Avatar, LetterAvatar } from "..";

export default function RequestCard({ user, onAccept, onReject }) {
  const [imageError, setImageError] = useState(false);
  const { email, name, image } = user;

  return (
    <Container>
      <div className="me-3">
        {image?.current && !imageError ? (
          <Avatar user={user} size={50} onError={() => setImageError(true)} />
        ) : (
          <LetterAvatar user={user} size={50} />
        )}
      </div>
      <div>
        <h5 className="m-0 text-uppercase fw-bold">
          {name?.firstName} {name?.lastName}
        </h5>
        <p className="m-0 text-muted">{email}</p>
      </div>
      <ActionContainer>
        <IconContainer bg="#10B981" onClick={onAccept}>
          <FiCheck />
        </IconContainer>
        <IconContainer bg="#EF4444" onClick={onReject}>
          <FiX />
        </IconContainer>
      </ActionContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ bg }) => bg};
  color: white;
  display: grid;
  place-items: center;
  border-radius: 0.2rem;
  margin-left: 2px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 120ms;

  :hover {
    transform: scale(1.2);
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

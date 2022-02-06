import React from "react";
import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { Avatar, LetterAvatar } from "..";
import { getLetterAvatarBg } from "../../utils";

export default function UserPreview({ user }) {
  const [imgError, setImgError] = useState();

  return (
    <Container>
      <AppHeader>
        <div>
          {user?.image?.current && !imgError ? (
            <Avatar user={user} size={70} onError={() => setImgError(true)} />
          ) : (
            <LetterAvatar user={user} size={70} />
          )}
        </div>
        <div className="ms-3">
          <h5 className="text-uppercase fw-bold m-0">
            {user?.name?.firstName} {user?.name?.lastName}{" "}
            <Position>( {user?.position} )</Position>
          </h5>
          <p className="text-muted m-0">
            {user?.email}{" "}
            <Badge college={user?.college?.acronym}>
              {user?.college?.acronym}
            </Badge>
          </p>
        </div>
      </AppHeader>
      <Content>
        <p className="m-0">
          {" "}
          Born in, <strong> {moment(user?.birthDate).format("LL")} </strong>
        </p>
        <p className="m-0">
          College of Arts and Sciences department of{" "}
          <strong>{user?.dept}</strong>
        </p>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  padding-top: 0.5rem;
  border-top: 2px solid ${({ theme }) => theme.colors.secondary};
  margin-left: 80px;
`;

const Position = styled.div`
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
`;

const Badge = styled.div`
  display: inline-grid;
  place-items: center;
  padding: 1px 8px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ college }) => getLetterAvatarBg(college)};
`;

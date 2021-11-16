import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { Avatar, LetterAvatar } from "..";
import { getConcatenated, getLetterAvatarBg } from "../../utils";

export default function UserCard({ user, onClick }) {
  const [isImageError, setIsImageError] = useState(false);
  return (
    <CardContainer onClick={onClick}>
      <Card.Body>
        <CardHeader>
          <div>
            {isImageError || !user.image ? (
              <LetterAvatar user={user} size={60} />
            ) : (
              <Avatar
                user={user}
                size={60}
                onError={() => setIsImageError(true)}
              />
            )}
          </div>
          <InformationContainer>
            <h4 className="m-0">{user?.name}</h4>
            <p className="email-address text-muted mb-0">
              {getConcatenated(user?.email, 30)}
            </p>
            <Badge user={user.dept}>{user?.dept}</Badge>
          </InformationContainer>
        </CardHeader>
      </Card.Body>
    </CardContainer>
  );
}

const CardContainer = styled(Card)`
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;

  .email-address {
    word-break: break-all;
  }
`;

const InformationContainer = styled.div`
  margin-left: 1rem;
`;

const Badge = styled.span`
  display: inline-grid;
  padding: 0.2rem 0.5rem;
  background-color: ${(props) => getLetterAvatarBg(props.user)};
  color: ${(props) => props.theme.colors.white};
  border-radius: 2rem;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.paragraph.xs};
`;

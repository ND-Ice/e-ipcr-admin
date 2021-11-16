import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { getLetterAvatarBg, getRelativeTime } from "../../utils";

export default function EvaluationCard({ evaluationInfo, onPreview }) {
  return (
    <CardContainer>
      <Card.Body>
        <Card.Title>{evaluationInfo.title}</Card.Title>
        <Badge dept={evaluationInfo.dept}>{evaluationInfo.dept}</Badge>
        <Card.Text>{evaluationInfo.description}</Card.Text>
        <Card.Text>Due: {getRelativeTime(evaluationInfo.due)}</Card.Text>

        <Button onClick={onPreview}>Preview</Button>
      </Card.Body>
    </CardContainer>
  );
}

const CardContainer = styled(Card)`
  border-radius: 0.5rem;
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const Badge = styled.span`
  display: inline-grid;
  font-size: ${(props) => props.theme.fontSize.paragraph.sm};
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  background: ${(props) => getLetterAvatarBg(props.dept)};
  color: ${(props) => props.theme.colors.white};
`;

import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { Links } from "..";
import { getOngoingEvaluations } from "../../store/evaluations";
import { EvaluationCard } from "../Cards";

export default function EvaluationTrailer() {
  const history = useHistory();
  const evaluations = useSelector(getOngoingEvaluations);
  return (
    <Container>
      <AppHeader>
        <h4 className="m-0">Evaluations</h4>
      </AppHeader>
      <Content>
        {evaluations?.slice(0, 3).map((evaluation) => (
          <EvaluationCard
            evaluationInfo={evaluation}
            key={evaluation.id}
            onPreview={() =>
              history.push(`/dashboard/evaluations/${evaluation.id}`)
            }
          />
        ))}
      </Content>
      <LinkContainer>
        <Links title="View More..." to="/dashboard/evaluations" />
      </LinkContainer>
    </Container>
  );
}

const Container = styled.div``;

const AppHeader = styled.div`
  padding: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const Content = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;

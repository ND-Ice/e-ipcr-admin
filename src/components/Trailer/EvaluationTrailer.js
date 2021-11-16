import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Divider, Links } from "..";
import { EvaluationCard } from "../Cards";

const evaluations = [
  {
    id: 1,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CAS",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 2,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CHM",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 3,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CAFA",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 4,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CBA",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
];

export default function EvaluationTrailer() {
  const history = useHistory();
  return (
    <Container>
      <header>
        <h2>Evaluations</h2>
      </header>
      <Divider bg="#000000" />
      <Content>
        {evaluations.slice(0, 3).map((evaluation) => (
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
        <Links title="View More..." to="/dashboard/faculties" />
      </LinkContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
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

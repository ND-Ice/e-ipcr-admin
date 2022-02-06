import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Links } from "..";
import { UserCard } from "../Cards";
import { getFaculties } from "../../store/faculties";

export default function FacultyTrailer() {
  const faculties = useSelector(getFaculties);
  return (
    <Container>
      <AppHeader>
        <h4 className="m-0">Faculties</h4>
      </AppHeader>
      <Content>
        {faculties?.list?.slice(0, 6).map((faculty) => (
          <UserCard key={faculty.id} user={faculty} />
        ))}
      </Content>
      <LinkContainer>
        <Links title="View More..." to="/dashboard/faculties" />
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

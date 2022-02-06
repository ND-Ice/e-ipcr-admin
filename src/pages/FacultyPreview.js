import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Avatar, LetterAvatar } from "../components";
import InformationCard from "../components/Cards/InformationCard";
import background from "../image/background.jpg";
import { getFaculties } from "../store/faculties";

export default function FacultyPreview({ match }) {
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const faculties = useSelector(getFaculties);

  useEffect(() => {}, []);
  console.log(faculties);

  return (
    <AppContainer>
      <AppHeader>
        {!imageError ? (
          <Avatar
            size={150}
            user={faculties.preview}
            onError={() => setImageError(true)}
          />
        ) : (
          <LetterAvatar size={150} user={faculties.preview} />
        )}
        <h1 className="text-white mt-2">Joshua Dela Cruz</h1>
      </AppHeader>

      <AppContent>
        <GridContainer>
          <InformationCard infoItem={faculties.preview} title="Introduction" />
          <InformationCard
            infoItem={faculties.preview}
            title="Contact Information"
          />
        </GridContainer>
        <InformationCard
          infoItem={faculties.preview}
          title="Basic Information"
        />
      </AppContent>
    </AppContainer>
  );
}

const AppContainer = styled.div``;
const AppHeader = styled.div`
  padding: 2rem;
  background: url(${background});
  background-position: center;
  background-size: cover;
  display: grid;
  place-items: center;
  border-radius: 0.5rem;
`;

const AppContent = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

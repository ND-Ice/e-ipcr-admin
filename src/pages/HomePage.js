import React from "react";
import styled from "styled-components";

import {
  DeanTrailer,
  EvaluationTrailer,
  FacultyTrailer,
} from "../components/Trailer";

export default function HomePage() {
  return (
    <AppContainer>
      <EvaluationTrailer />
      <FacultyTrailer />
      <DeanTrailer />
    </AppContainer>
  );
}

const AppContainer = styled.div``;

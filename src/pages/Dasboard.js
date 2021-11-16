import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { SidebarDesktop } from "../components/Sidebar";

import {
  Evaluations,
  Faculties,
  FacultyPreview,
  HomePage,
  OngoingEvaluations,
  PreviewDean,
  PastEvaluations,
  Deans,
  EvaluationPreview,
  FacultySearch,
  DeanSearch,
  FilteredEvaluationResult,
  FilteredSentimentResult,
} from ".";

const user = {
  id: 1,
  name: "Joshua Dela Cruz",
  email: "delacruz.joshua.bscs@gmail.com",
  image:
    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
  dept: "CAS",
};

export default function Dasboard() {
  return (
    <>
      <Navbar user={user} />
      <AppContainer>
        <SidebarDesktop />
        <Switch>
          <Route path="/dashboard/faculties/search" component={FacultySearch} />
          <Route path="/dashboard/faculties/:id" component={FacultyPreview} />
          <Route path="/dashboard/faculties" component={Faculties} />
          <Route path="/dashboard/deans/search" component={DeanSearch} />
          <Route path="/dashboard/deans/:id" component={PreviewDean} />
          <Route path="/dashboard/deans" component={Deans} />
          <Route
            path="/dashboard/evaluations/result/:remarks"
            component={FilteredEvaluationResult}
          />
          <Route
            path="/dashboard/evaluations/sentiment/:result"
            component={FilteredSentimentResult}
          />
          <Route
            path="/dashboard/evaluations/:id"
            component={EvaluationPreview}
          />
          <Route path="/dashboard/evaluations" component={Evaluations} />
          <Route
            path="/dashboard/ongoing-evaluations"
            component={OngoingEvaluations}
          />
          <Route
            path="/dashboard/past-evaluations"
            component={PastEvaluations}
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </AppContainer>
    </>
  );
}

const AppContainer = styled.div`
  display: grid;
  padding: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 4fr;
    padding: 1rem 5rem;
    gap: 1rem;
  }
`;

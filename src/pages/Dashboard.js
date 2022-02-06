import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { SidebarDesktop } from "../components/Sidebar";
import { getUser } from "../store/user";

import {
  Evaluations,
  Faculties,
  FacultyPreview,
  PreviewDean,
  EvaluationPreview,
  FacultySearch,
  DeanSearch,
  FacultyRequests,
  Users,
  UsersRequests,
} from ".";
import { useSelector } from "react-redux";

export default function Dasboard() {
  const user = useSelector(getUser);
  return (
    <>
      <Navbar user={user?.currentUser} />
      <AppContainer>
        <SidebarDesktop />
        <Switch>
          <Route path="/dashboard/faculties/search" component={FacultySearch} />
          <Route path="/dashboard/faculties/:id" component={FacultyPreview} />
          <Route path="/dashboard/deans/search" component={DeanSearch} />
          <Route path="/dashboard/deans/:id" component={PreviewDean} />
          <Route
            path="/dashboard/evaluations/:id"
            component={EvaluationPreview}
          />
          <Route path="/dashboard/evaluations" component={Evaluations} />
          <Route
            path="/dashboard/faculty-requests"
            component={FacultyRequests}
          />
          <Route path="/dashboard/users" component={Users} />
          <Route path="/dashboard/users-requests" component={UsersRequests} />

          <Route path="/dashboard" component={Faculties} />
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

import React from "react";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { SidebarDesktop } from "../components/Sidebar";
import { CreateDeanAccount, CreateFacultyAccount, Faculties } from ".";

export default function Dasboard() {
  return (
    <>
      <Navbar />
      <AppContainer>
        <SidebarDesktop />
        <Switch>
          <Route
            path="/dashboard/create-faculty-account"
            component={CreateFacultyAccount}
          />
          <Route
            path="/dashboard/create-dean-account"
            component={CreateDeanAccount}
          />
          <Route path="/dashboard/faculties" component={Faculties} />
        </Switch>
      </AppContainer>
    </>
  );
}

const AppContainer = styled.div`
  display: grid;
  padding: 1rem;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 4fr;
    padding: 1rem 5rem;
    gap: 1rem;
  }
`;

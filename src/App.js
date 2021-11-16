import React from "react";
import { Route, Switch } from "react-router-dom";
import { ScrollToTop } from "./components";
import {
  ActivateAccount,
  Dashboard,
  LoginPage,
  PasswordRecoveryPage,
} from "./pages";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/activate-account" component={ActivateAccount} />
        <Route path="/forgot-password" component={PasswordRecoveryPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </>
  );
}

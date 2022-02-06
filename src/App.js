import React from "react";
import { Route, Switch } from "react-router-dom";
import { ScrollToTop } from "./components";
import { Dashboard, LoginPage } from "./pages";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </>
  );
}

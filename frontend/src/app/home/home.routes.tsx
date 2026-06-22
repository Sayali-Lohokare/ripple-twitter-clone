import React from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router";
import Home from "./pages/Home";

const HomeRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {/* Default page for /home */}
      <Route exact path={path} component={Home} />


      {/* Catch-all inside /home */}
      {/* <Route path="*">
        <Redirect to={path} />
      </Route> */}
    </Switch>
  );
};

export default HomeRoutes;

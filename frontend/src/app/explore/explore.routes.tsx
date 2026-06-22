import React from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router";
import ExploreMainPage from "./pages/main";

const ExploreRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {/* Default route for /explore */}
      <Route exact path={path} component={ExploreMainPage} />

      {/* Other nested routes under /explore */}
      {/* <Route path={`${path}/other`} component={SomeOtherExplorePage} /> */}

      {/* Optional catch-all for /explore */}
      <Route path="*">
        <Redirect to={path} />
      </Route>
    </Switch>
  );
};

export default ExploreRoutes;

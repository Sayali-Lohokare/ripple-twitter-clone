import { Route, Switch, useRouteMatch } from "react-router";
import Profile from "./pages/Profile";

const ProfileRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Profile} />

      {/* Catch-all inside /home */}
      {/* <Route path="*">
        <Redirect to={path} />
      </Route> */}
    </Switch>
  );
};

export default ProfileRoutes;

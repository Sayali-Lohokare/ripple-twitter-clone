import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import AuthMainPage from "./pages/AuthMainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useSnapshot } from "valtio";
import userStore from "../../store/user.store";
import { useEffect } from "react";


const AuthRoutes = () => {
  const { path } = useRouteMatch();

  const {user, token, isAuthenticated} = useSnapshot(userStore);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to home if already authenticated
      window.location.href = "/home";
    }
  }, [isAuthenticated]);

  return (
    <IonRouterOutlet>
      <Switch>
        {/* Default page for /home */}
        <Route exact path={path} component={AuthMainPage} />
        <Route exact path={path + "/login"} component={LoginPage} />
        <Route exact path={path + "/register"} component={RegisterPage} />

        {/* Catch-all inside /home */}
        {/* <Route path="*">
          <Redirect to={path} />
        </Route> */}
      </Switch>
    </IonRouterOutlet>
  );
};

export default AuthRoutes;

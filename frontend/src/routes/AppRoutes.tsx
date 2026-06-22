import React from "react";
import {Redirect, Route, Switch} from "react-router";
import Profile from "../app/profile/pages/Profile";
import Search from "../app/Search";
import Notifications from "../app/notifications/pages/Notifications";
import {IonApp, IonPage, IonRouterOutlet} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import ExploreRoutes from "../app/explore/explore.routes";
import ResponsiveLayout from "../components/layout/ResponsiveLayout";
import AuthRoutes from "../app/auth/auth.routes";
import HomeRoutes from "../app/home/home.routes";
import axios from "axios";
import { configure } from "axios-hooks";
import { useSnapshot } from "valtio";
import userStore from "../store/user.store";
import ProfileDetails from "../app/profile/pages/ProfileDetails";
import RegisterPage from "../app/auth/pages/RegisterPage";
import LoginPage from "../app/auth/pages/LoginPage";
import { ToastProvider } from "../app/core/components/ToastProvider";
import SavedPosts from "../app/home/pages/SavedPosts";

const AppRoutes = () => {
    const { user, token, isAuthenticated } = useSnapshot(userStore);

    const axiosInstance = axios.create({
    baseURL: "http://ripple.eu-north-1.elasticbeanstalk.com/api",
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  configure({ axios: axiosInstance });
    return(
    <IonApp>
        <ToastProvider>

        <IonReactRouter>
            <IonRouterOutlet>
                {/* <   Route exact path="/" render={() => <Redirect to={isAuthenticated ? "/home" : "/auth/login"} />} /> */}
                    <Route  path="/login" component={LoginPage}/>
                    <Route  path="/register" component={RegisterPage}/>
                <ResponsiveLayout>
                    <Route exact path="/search" component={Search}/>
                    <Route exact path="/notifications" component={Notifications}/>
                    <Route path="/home" component={HomeRoutes}/>
                    <Route path="/save" component={SavedPosts}/>
                    <Route path="/explore" component={ExploreRoutes}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/profile/:id" component={ProfileDetails} />
                </ResponsiveLayout>
            </IonRouterOutlet>
        </IonReactRouter>
        </ToastProvider>
    </IonApp>
);
};

export default AppRoutes;

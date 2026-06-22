import React from "react";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet
} from "@ionic/react";
import { home, search, person, notifications, bookmarkSharp } from "ionicons/icons";

const MobileLayout = ({ children }: { children: React.ReactNode }) => (
    // <IonPage className="bg-black">
    <div>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Twitter Clone</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonTabs >
        <IonRouterOutlet>{children}</IonRouterOutlet>

        <IonTabBar className="pb-5" slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
          </IonTabButton>

          <IonTabButton tab="saved" href="/save">
            <IonIcon icon={bookmarkSharp} />
          </IonTabButton>

          <IonTabButton tab="notifications" href="/notifications">
            <IonIcon icon={notifications} />
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </div>
    // </IonPage>
);

export default MobileLayout;

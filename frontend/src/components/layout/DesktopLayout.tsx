import React from "react";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { IonCol, IonRow } from "@ionic/react";

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <IonRow className="bg-black">
      {/* <aside className="left-sidebar">
      </aside> */}
      <IonCol size="1"></IonCol>
      <IonCol size="2"><Sidebar/></IonCol>
      <IonCol size="6">{children}</IonCol>
      <IonCol size="3"><RightSidebar/></IonCol>

      {/* <main className="main-content">{children}</main>

      <aside className="right-sidebar">
        <RightSidebar />
      </aside> */}
    </IonRow>
  );
};

export default DesktopLayout;

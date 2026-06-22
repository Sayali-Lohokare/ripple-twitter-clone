import {
    IonButton,
    IonCol,
    IonIcon,
    IonImg,
    IonLabel,
    IonRow,
    useIonRouter,
} from "@ionic/react";
import {
  bookmarkSharp,
    ellipsisHorizontal,
    ellipsisHorizontalOutline,
    home,
    homeOutline,
    mail,
    mailOutline,
    notifications,
    notificationsOutline,
    person,
    personOutline,
    search,
    searchOutline
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Home", icon: homeOutline, iconActive: home, path: "/home" },
  
  {
    label: "Notifications",
    icon: notificationsOutline,
    iconActive: notifications,
    path: "/notifications",
  },
  
  { label: "Saved", icon: bookmarkSharp, iconActive: search, path: "/save" },
  {
    label: "Profile",
    icon: personOutline,
    iconActive: person,
    path: "/profile",
  },
  
];

const Sidebar = () => {
  const location = useLocation();
  const ionRouter = useIonRouter()

  return (
    <IonRow className="h-screen bg-black text-white">
      <IonCol size="12" className="flex flex-col justify-items-start py-4">
        {/* Logo */}
        <div className="px-4 pb-6">
          <IonImg src="/assets/icon.png" className="w-20" alt="X Logo" />
        </div>
        

        {/* Menu */}
        <div className="flex flex-col space-y-6 mt-20">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.path}
                className={`flex items-center px-4  cursor-pointer`}
                onClick={() => ionRouter.push(item.path)}
              >
                <IonIcon
                  icon={
                    `${
                      isActive ? item.iconActive || item.icon : item.icon
                    }` as string
                  }
                  className="text-2xl"
                />

                <IonLabel
                  className={`ml-4 text-xl  ${
                    isActive ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.label}
                </IonLabel>
              </div>
            );
          })}
        </div>

        {/* Post Button */}
        {/* <div className="px-4">
          <IonButton
            color="white"
            fill="clear"
            className="w-full bg-white text-black font-semibold py-1 rounded-3xl text-lg shadow-none"
          >
            Post
          </IonButton>
        </div> */}
      </IonCol>
    </IonRow>
  );
};

export default Sidebar;

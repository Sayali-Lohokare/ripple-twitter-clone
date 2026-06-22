import { IonContent, IonPage, IonImg, IonIcon, IonRow, IonCol, IonAvatar } from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
import Avatar from 'react-avatar';

const newsData = [
  {
    title: "Arsenal Teen Star Max Downman Faces Two Months Out with Ankle Injury",
    time: "10 hours ago",
    category: "Sports",
    posts: "3,743 posts",
    avatars: [
      "/assets/avatar1.jpg",
      "/assets/avatar2.jpg",
    ],
  },
  {
    title: "Ireland Housing Video Draws Backlash for Downplaying Crisis",
    time: "2 days ago",
    category: "News",
    posts: "3,776 posts",
    avatars: [
      "/assets/avatar3.jpg",
      "/assets/avatar4.jpg",
    ],
  },
  {
    title: "NHS Fife Harassed Nurse Over Trans Doctor in Changing Room, Tribunal Rules",
    time: "2 days ago",
    category: "News",
    posts: "78.5K posts",
    avatars: [
      "/assets/avatar5.jpg",
      "/assets/avatar6.jpg",
      "/assets/avatar7.jpg",
    ],
  },
];

const trendingData = [
  {
    title: "AFCON",
    category: "Sports · Trending",
    posts: "25.1K posts",
  },
  {
    title: "Mo Salah",
    category: "Sports · Trending",
    posts: "81.2K posts",
  },
];

const RightSideBar: React.FC = () => {
  return (
    <div className="bg-black text-white p-4 min-h-screen">

        {/* Today's News */}
        <IonRow className="bg-gray-900 rounded-xl p-4 mb-6">
          <IonCol size="12" className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Today’s News</h2>
            <IonIcon icon={close} className="text-gray-400 cursor-pointer" />
          </IonCol>
          {newsData.map((item, index) => (
            <IonCol size="12" key={index} className="flex flex-col space-y-1 mb-3">
              <p className="font-semibold">{item.title}</p>
              <IonRow className="items-center text-gray-400 text-sm">
                <IonCol size="auto" className="flex -space-x-2">
                  {item.avatars.map((avatar, idx) => (
                    <Avatar size="30" round={true}  />

                  ))}
                </IonCol>
                <IonCol>
                  <span>{item.time} · {item.category} · {item.posts}</span>
                </IonCol>
              </IonRow>
            </IonCol>
          ))}
        </IonRow>

        {/* What's Happening */}
        <IonRow className="bg-gray-900 rounded-xl p-4">
          <IonCol size="12" className="font-bold text-lg mb-4">What’s happening</IonCol>
          {trendingData.map((item, index) => (
            <IonCol size="12" key={index} className="flex justify-between items-start mb-3">
              <IonCol size="auto" className="flex flex-col space-y-1">
                <span className="text-gray-400 text-sm">{item.category}</span>
                <p className="font-semibold">{item.title}</p>
                <span className="text-gray-400 text-sm">{item.posts}</span>
              </IonCol>
              <IonCol size="auto" className="text-gray-400 cursor-pointer">...</IonCol>
            </IonCol>
          ))}
        </IonRow>
     
          </div>
  );
};

export default RightSideBar;

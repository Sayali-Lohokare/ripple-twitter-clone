import React, { useState } from 'react';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToolbar,
  IonSearchbar,
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonAvatar,
  IonIcon,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

// Dummy data
const newsData = [
  { title: 'UK Schools Embrace Christmas Jumper Day for Charity', category: 'Trending now', source: 'Other', posts: 47, avatars: ['/avatar1.png', '/avatar2.png'] },
  { title: 'DeepSeek Reportedly Uses Smuggled Nvidia Blackwell Chips for AI Training', category: 'Trending now', source: 'Other', posts: 193, avatars: ['/avatar3.png', '/avatar4.png'] },
  { title: 'Somali-American Defends Community Against Trump\'s Criticism', category: 'Trending now', source: 'Other', posts: 255, avatars: ['/avatar5.png', '/avatar6.png'] },
];

const trendingTopics = [
  { topic: 'Amber', category: 'American actors', posts: '17.1K' },
  { topic: 'Ireland', category: 'Trending in Ireland', posts: '33.8K' },
  { topic: 'Enoch', category: 'Trending in Ireland', posts: '9,323' },
  { topic: 'Biden', category: 'Politics', posts: '223K' },
];

const ExploreMainPage: React.FC = () => {
  const [segment, setSegment] = useState('forYou');

  const renderAvatars = (avatars: string[]) => (
    <div className="flex -space-x-2 mr-2">
      {avatars.map((src, index) => (
        <IonAvatar key={index} className="w-5 h-5 border border-black dark:border-white">
          <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
            {index === 0 ? 'A' : 'B'}
          </div>
        </IonAvatar>
      ))}
    </div>
  );

  return (
    <IonPage className="dark:bg-black bg-white text-black dark:text-white">
      {/* Top Toolbar */}
      <IonToolbar className="ion-no-padding bg-black dark:bg-black">
        <div className="flex items-center p-3">
          <IonSearchbar
            placeholder="Search"
            className="w-full"
            style={{ '--background': '#1f2937', '--placeholder-color': '#9ca3af','--border-radius':"100px" }}
          />
          <div className="ml-3 cursor-pointer text-white text-2xl">
            <IonIcon icon={settingsOutline}></IonIcon>
          </div>
        </div>
      </IonToolbar>

      {/* Segment for navigation */}
      <IonToolbar className="bg-black dark:bg-black p-0">
        <IonSegment
          value={segment}
          onIonChange={e => setSegment(String(e.detail.value!))}
          className=""
        >
          <IonSegmentButton value="forYou">
            <IonLabel className="text-sm font-semibold ">For You</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="trending">
            <IonLabel className="text-sm font-semibold ">Trending</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="news">
            <IonLabel className="text-sm font-semibold ">News</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sports">
            <IonLabel className="text-sm font-semibold">Sports</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="entertainment">
            <IonLabel className="text-sm font-semibold">Entertainment</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>

      {/* Content */}
      <IonContent className="bg-black dark:bg-black pt-0">
        {/* Render based on segment */}
        {segment === 'forYou' && (
          <div className="p-3">
            <h2 className="text-xl font-bold mb-4 text-white">Today's News</h2>
            <IonList className="ion-no-padding bg-black dark:bg-black">
              {newsData.map((item, index) => (
                <IonItem key={index} lines="none" className="mb-4 ion-no-padding bg-black dark:bg-black" detail={false}>
                  <div className="flex flex-col w-full py-2">
                    <p className="text-base font-medium text-white mb-1">{item.title}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      {renderAvatars(item.avatars)}
                      <span className="mr-1">{item.category}</span>
                      <span className="mr-1">·</span>
                      <span className="mr-1">{item.source}</span>
                      <span className="mr-1">·</span>
                      <span>{item.posts} posts</span>
                    </div>
                  </div>
                </IonItem>
              ))}
            </IonList>
          </div>
        )}

        {segment === 'trending' && (
          <div className="p-3">
            <h2 className="text-xl font-bold mb-4 text-white">Trending Topics</h2>
            <IonList className="ion-no-padding bg-black dark:bg-black">
              {trendingTopics.map((item, index) => (
                <IonItem key={index} lines="none" className="mb-4 ion-no-padding bg-black dark:bg-black" detail={false}>
                  <div className="flex flex-col w-full py-2">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-400">{item.category} · Trending</p>
                      <span className="text-lg text-gray-400 cursor-pointer">...</span>
                    </div>
                    <h3 className="text-lg font-bold text-white my-1">{item.topic}</h3>
                    <p className="text-sm text-gray-400">{item.posts} posts</p>
                  </div>
                </IonItem>
              ))}
            </IonList>
          </div>
        )}

        {/* Add more segments content here if needed */}
      </IonContent>
    </IonPage>
  );
};

export default ExploreMainPage;

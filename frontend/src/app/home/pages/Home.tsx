import {
  IonCol,
  IonContent,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  useIonRouter
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import ExternalWebPanel from "../../core/components/ExternalWebPanel";
import PushNotificationsSetup from "../../core/components/PushNotifications";
import { useSnapshot } from "valtio";
import userStore from "../../../store/user.store";

type Tweet = {
  id: number;
  username: string;
  handle: string;
  text: string;
  img: string;
  likes: number;
  retweets: number;
  comments: number;
  liked: boolean;
  retweeted: boolean;
};

const Home: React.FC = () => {
  const [segment, setSegment] = useState<"for-you" | "following">("for-you");
  const ionRounter = useIonRouter();
const {user,isAuthenticated}= useSnapshot(userStore);
useEffect(() => {
  if(!isAuthenticated){
    console.log("User is authenticated",isAuthenticated);
ionRounter.push("/login");
  }
}, []);
  //   console.log("segment =", segment);
  // console.log("tweets length =", tweets.length, tweets);

  return (
    <IonPage>
       <IonContent fullscreen className="bg-black text-white">
        
           <PushNotificationsSetup />

      <IonRow>
        <IonCol size="12" class="mt-10">
<IonSegment value="for-you">
        <IonSegmentButton value="for-you" contentId="for-you">
          <IonLabel>FOR YOU</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="following" contentId="following">
          <IonLabel>FOLLOWING</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {/* <ExternalWebPanel isOpen={true} url={"https://capacitorjs.com/docs/guides/push-notifications-firebase"} onClose={()=>{}}/> */}

      <IonSegmentView>
        <IonSegmentContent id="for-you">
          <Post />
        </IonSegmentContent>
        <IonSegmentContent id="following">
          <Post />
        </IonSegmentContent>
      </IonSegmentView>
        </IonCol>
      </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;

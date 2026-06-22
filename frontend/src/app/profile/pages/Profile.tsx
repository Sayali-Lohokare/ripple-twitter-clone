import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonAvatar,
  IonButton,
  IonIcon,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  useIonRouter,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import Avatar from "react-avatar";
import Post from "../../home/components/Post";
import useAxios from "axios-hooks";
import { useSnapshot } from "valtio";
import userStore from "../../../store/user.store";
import UserPosts from "../../home/components/UserPosts";
import { useEffect } from "react";

const Profile = () => {
const { user, token, isAuthenticated } = useSnapshot(userStore);

 const [{ data, loading, error }, getUserDetails] = useAxios<any>(
    {
      url: `/users/profile/${user?.id}`,
      method: "GET",
    },
    { manual: false }
  );
  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  const ionRouter = useIonRouter();
  
  const wipeDataAndLogout = () => {
    userStore.user = null;
    userStore.token = null;
    userStore.isAuthenticated = false;
    ionRouter.push("/login");
  }
  return (
    <IonPage className="bg-black">
      {/* Top Header */}
      <IonHeader>
        <IonToolbar className="bg-black text-white">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>

          <IonTitle className="text-sm font-semibold">
            PURUSHOTHAM REDDY
            <p className="text-xs text-gray-400">{data?.posts?.length} posts</p>
          </IonTitle>

          <IonButton fill="clear" onClick={()=>{wipeDataAndLogout()}} slot="end">
            Log Out
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-black text-white">
        <div>

        
        {/* Cover Image */}
        <div className="h-40 bg-gray-700 w-full"></div>

        {/* Profile Section */}
        <div className="relative px-4">
          {/* Avatar */}
            <Avatar className="absolute -top-10 " size="133" round={true} />

          {/* Edit Profile Button */}
          <div className="flex justify-end pt-4">
            <IonButton
              fill="outline"
              size="small"
              className="rounded-full text-white border-gray-500"
            >
              {/* Edit profile */}
            </IonButton>
          </div>

          {/* User Info */}
          <div className="mt-10">
            <IonText>
              <h2 className="text-xl font-bold">{data?.user.name}</h2>
            </IonText>

            <IonText className="text-gray-500 text-sm">
              <p>@{data?.user?.username}</p>
            </IonText>

            {/* <IonText className="text-gray-500 text-sm flex items-center gap-1 mt-2">
              <span>📅</span>
              <span>Born December 2025</span>
            </IonText> */}

            {/* Following / Followers */}
            <div className="flex gap-4 mt-3 text-sm">
              <p>
                <span className="font-semibold text-gray-500">{data?.user.following?.length}</span>{" "}
                <span className="text-gray-500">Following</span>
              </p>
              <p>
                <span className="font-semibold text-gray-500">{data?.user.followers?.length}</span>{" "}
                <span className="text-gray-500">Followers</span>
              </p>
            </div>
          </div>
        </div>
        <IonSegment value="posts">
                <IonSegmentButton value="posts" contentId="posts">
                  <IonLabel>Posts</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="replies" contentId="replies">
                  <IonLabel>Replies</IonLabel>
                </IonSegmentButton>
              </IonSegment>
        
              <IonSegmentView>
                <IonSegmentContent id="posts">
                  <UserPosts userId={user?.id!}/>
                </IonSegmentContent>
                <IonSegmentContent id="replies">
                  <UserPosts userId={user?.id!}/>
                </IonSegmentContent>
                
              </IonSegmentView>
              </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

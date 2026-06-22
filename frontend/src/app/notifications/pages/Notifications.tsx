import {
  IonPage,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSpinner,
  IonItem,
  IonAvatar,
  IonText,
} from "@ionic/react";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";

type Notification = {
  id: string;
  userId: string;
  fromUserId: string;
  fromUsername: string;
  type: "FOLLOW" | "LIKE" | "COMMENT";
  message: string;
  referenceId?: string | null;
  createdAt: number;
  read: boolean;
};


const Notifications: React.FC = () => {
  const [segment, setSegment] = useState<"all" | "verified" | "mentions">("all");

  const [{ data, loading, error }, getNotifications] = useAxios<Notification[]>(
    {
      url: "/notifications/me",
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <IonPage className="bg-black text-white">
      <IonContent fullscreen>
        {/* Segment */}
        <IonSegment
          className="mt-4"
          value={segment}
          onIonChange={(e) => setSegment(e.detail.value as any)}
        >
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="verified">
            <IonLabel>Verified</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="mentions">
            <IonLabel>Mentions</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mt-6">
            <IonSpinner />
          </div>
        )}

        {/* Error */}
        {error && (
          <IonText color="danger" className="ion-padding">
            Failed to load notifications
          </IonText>
        )}

        {/* Empty */}
        {!loading && data?.length === 0 && (
          <IonText className="ion-padding text-gray-400">
            No notifications yet
          </IonText>
        )}

        {/* Notification List */}
        {data?.map((notification) => (
          <IonItem
            key={notification.id}
            lines="none"
            className={`bg-black ${
              !notification.read ? "border-l-2 border-blue-500" : ""
            }`}
          >
            <IonAvatar className="mr-3" slot="start">
              <Avatar
                name={notification.fromUsername}
                size="40"
                round
              />
            </IonAvatar>

            <IonText className="my-10">
              <strong>@{notification.fromUsername}</strong>{" "}
              {notification.message}
              <div className="text-xs text-gray-400 mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
            </IonText>
          </IonItem>
        ))}
        
      </IonContent>
    </IonPage>
  );
};

export default Notifications;

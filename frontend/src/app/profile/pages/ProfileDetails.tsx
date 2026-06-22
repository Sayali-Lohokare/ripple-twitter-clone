import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonIcon,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  IonSpinner,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import Avatar from "react-avatar";
import useAxios from "axios-hooks";
import { useParams } from "react-router";
import { useSnapshot } from "valtio";

import UserPosts from "../../home/components/UserPosts";
import userStore from "../../../store/user.store";

const ProfileDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSnapshot(userStore);

  /* =========================
     FETCH PROFILE
     ========================= */
  const [{ data, loading, error }] = useAxios(`/users/profile/${id}`);

  /* =========================
     FOLLOW / UNFOLLOW APIS
     ========================= */
  const [{ loading: followLoading }, followUser] = useAxios(
    { url: "/users/follow", method: "POST" },
    { manual: true }
  );

  const [{ loading: unFollowLoading }, unfollowUser] = useAxios(
    { url: "/users/unfollow", method: "POST" },
    { manual: true }
  );

  /* =========================
     LOCAL UI STATE
     ========================= */
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  /* =========================
     INITIALIZE STATE
     ========================= */
  useEffect(() => {
    if (data && user?.id) {
      setIsFollowing(data.user.followers.includes(user.id));
      setFollowersCount(data.user.followers.length);
    }
  }, [data, user?.id]);

  /* =========================
     HANDLERS
     ========================= */
  const handleFollow = async () => {
    try {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);

      await followUser({
        params: { followerId: user?.id, targetId: data.user.id },
      });
    } catch (err) {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
      console.error(err);
    }
  };

  const handleUnFollow = async () => {
    try {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);

      await unfollowUser({
        params: { followerId: user?.id, targetId: data.user.id },
      });
    } catch (err) {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
      console.error(err);
    }
  };

  /* =========================
     LOADING / ERROR STATES
     ========================= */
  if (loading)
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonSpinner />
          <p>Loading profile...</p>
        </IonContent>
      </IonPage>
    );

  if (error || !data)
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>Failed to load profile.</p>
        </IonContent>
      </IonPage>
    );

  /* =========================
     RENDER
     ========================= */
  return (
    <IonPage className="bg-black text-white">
      {/* Header */}
      <IonHeader>
        <IonToolbar className="bg-black">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{data.user.name}</IonTitle>
          <IonButtons slot="end">
            <IonIcon icon={searchOutline} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-black text-white">
        {/* Cover */}
        <div
          className="h-40 w-full bg-gray-700"
          style={{
            backgroundImage: `url(${data.coverImage || ""})`,
            backgroundSize: "cover",
          }}
        />

        {/* Profile */}
        <div className="relative px-4">
          <Avatar
            className="absolute -top-10"
            size="133"
            round
            name={data.user.name}
            src={data.profileImage || ""}
          />

          {/* Follow Button */}
          <div className="flex text-black justify-end pt-10">
            {user?.id !== data.user.id && (
              <IonButton
                onClick={isFollowing ? handleUnFollow : handleFollow}
                disabled={followLoading || unFollowLoading}
                fill={isFollowing ? "outline" : "solid"}
                size="small"
                className="text-blue-300"
              >
                {followLoading || unFollowLoading ? (
                  <IonSpinner name="dots" />
                ) : isFollowing ? (
                  "Following"
                ) : (
                  "Follow"
                )}
              </IonButton>
            )}
          </div>

          {/* User Info */}
          <div className="mt-10">
            <IonText>
              <h2 className="text-xl font-bold">{data.user.name}</h2>
            </IonText>
            <IonText className="text-gray-500 text-sm">
              <p>@{data.user.username}</p>
            </IonText>

            <div className="flex text-gray-500 gap-4 mt-3 text-sm">
              <p>
                <strong className="text-gray-500">{data.user.following.length}</strong> Following
              </p>
              <p>
                <strong className="text-gray-500">{followersCount}</strong> Followers
              </p>
            </div>
          </div>
        </div>

        {/* Segments */}
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
            <UserPosts userId={data.user.id} />
          </IonSegmentContent>

          <IonSegmentContent id="replies">
            <UserPosts userId={data.user.id} />
          </IonSegmentContent>
        </IonSegmentView>
      </IonContent>
    </IonPage>
  );
};

export default ProfileDetails;

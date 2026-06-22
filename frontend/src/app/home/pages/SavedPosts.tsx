import {
    IonButton,
    IonCol,
    IonContent,
    IonIcon,
    IonLabel,
    IonPage,
    IonRow
} from "@ionic/react";
import useAxios from "axios-hooks";
import {
    bookmarkOutline,
    bookmarkSharp,
    chatbubbleOutline,
    heartOutline,
    repeatOutline,
    shareOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import ExternalWebModal from "../../core/components/ExternalWebPanel";
import ShareButton from "../../core/components/ShareBuuton";
import { useSnapshot } from "valtio";
import userStore from "../../../store/user.store";
import { useToast } from "../../core/components/ToastProvider";

export default function SavedPosts() {
    const {user} = useSnapshot(userStore)
    const { showToast } = useToast();

  const [{ data, loading, error }, getPosts] = useAxios<any>(
    {
      url: `/users/me/saved`,
      method: "GET",
    },
    { manual: true }
  );

  const [, unsavePostRequest] = useAxios(
  { url: "", method: "POST" },
  { manual: true }
);

const handleUnsavePost = async (postId: string) => {
  if (!user?.id) return;

  try {
    await unsavePostRequest({
      url: `/users/unsave?userId=${user.id}&postId=${postId}`,
    });
    // Refresh saved posts after unsaving
    showToast("Post unsaved successfully!", 2000, "success");
    getPosts();
  } catch (err) {
    console.error(err);
    alert("Failed to unsave post.");
  }
};


  useEffect(() => {
    getPosts();
  }, []);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  function renderTextWithLinks(
    text: string,
    onLinkClick: (url: string) => void
  ) {
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <span
            key={index}
            className="text-blue-500 cursor-pointer"
            onClick={() => onLinkClick(part)}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }

  return (
    <IonPage>
        <IonContent>
            
        
    <IonRow>
      <IonCol
        size="12"
        className="bg-black text-white p-4 border-b border-gray-700"
      >
        <IonRow>
          {/* <IonCol size="12">
            <CreatePostForm postCreated={()=>getPosts()} />
          </IonCol> */}
          {/* <IonCol size="12" className="text-center">
            <IonText color="primary">Show 172 posts</IonText>
          </IonCol> */}

          <IonCol size="12" className="mt-5">
            <ExternalWebModal
              url={activeUrl}
              isOpen={!!activeUrl}
              onClose={() => setActiveUrl(null)}
            />
            {data?.length===0 && <>no saved posts</>}
            <div className="border-t border-gray-700 mb-4 mt-3 pt-3">
              {data?.map((tweet: any, index: any) => (
                <IonRow className="mt-10" key={index}>
                  <IonCol size="2" sizeSm="1.5">
                    <Avatar size="40" name={tweet.authorName} round={true} />
                  </IonCol>
                  <IonCol size="10" sizeSm="10.5">
                    <IonRow>
                      <IonCol size="10" className="text-left">
                        <div className="tweet-header-row">
                          <span className="tweet-author">
                            {tweet.authorUsername}{" "}
                          </span>
                          <span className="tweet-handle">
                            @{tweet?.authorName}
                          </span>
                        </div>
                      </IonCol>
                      <IonCol size="2" class="text-right">
                        {/* <ShareButton text="this is test share" /> */}
                        <IonIcon
                                              onClick={()=>handleUnsavePost(tweet.id)}
                                                size="large"
                                                icon={bookmarkSharp}
                                                className="text-gray-400 cursor-pointer"
                                              />
                        {/* <IonIcon
                        size="large"
                        icon={shareOutline}
                        className="text-gray-400 cursor-pointer"
                      /> */}
                      </IonCol>
                      <IonCol size="12">
                        <IonLabel>
                          <p className="tweet-text">
                            {renderTextWithLinks(tweet?.content, setActiveUrl)}
                          </p>
                          <div className="mt-3">
                            {tweet?.imageUrls?.length > 0 && (
                              <div className="tweet-image-wrapper">
                                {tweet.imageUrls.map(
                                  (url: string, index: number) =>
                                    url && (
                                      <img
                                        key={index}
                                        src={url}
                                        alt={`tweet media ${index + 1}`}
                                        width={200}
                                        loading="lazy"
                                      />
                                    )
                                )}
                              </div>
                            )}
                          </div>

                          <div className="tweet-actions-row">
                            <IonButton
                              fill="clear"
                              size="small"
                              className="tweet-action-btn"
                            >
                              <IonIcon icon={chatbubbleOutline} slot="start" />
                              <span>{tweet.response}</span>
                            </IonButton>

                            <IonButton
                              fill="clear"
                              size="small"
                              className="tweet-action-btn"
                              color={tweet.retweet ? "primary" : "medium"}
                            >
                              <IonIcon icon={repeatOutline} slot="start" />
                              <span>{tweet.retweets}</span>
                            </IonButton>

                            <IonButton
                              fill="clear"
                              size="small"
                              className="tweet-action-btn"
                              color={tweet.liked ? "danger" : "medium"}
                            >
                              <IonIcon icon={heartOutline} slot="start" />
                              {/* <span>{tweet?.likes}</span> */}
                            </IonButton>

                            <IonButton
                              fill="clear"
                              size="small"
                              className="tweet-action-btn"
                            >
                              <IonIcon icon={shareOutline} slot="start" />
                            </IonButton>
                          </div>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonRow>
              ))}
            </div>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
    </IonContent>
    </IonPage>
  );
}

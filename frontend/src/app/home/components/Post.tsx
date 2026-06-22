import {
  IonButton,
  IonCol,
  IonIcon,
  IonLabel,
  IonList,
  IonRow,
  useIonRouter
} from "@ionic/react";
import {
  bookmarkOutline,
  bookOutline,
  chatbubbleOutline,
  heartOutline,
  repeatOutline,
  saveOutline,
  shareOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import ExternalWebModal from "../../core/components/ExternalWebPanel";
import CreatePostForm from "./CreatePostForm";
import ShareButton from "../../core/components/ShareBuuton";
import useAxios from "axios-hooks";
import { ur } from "zod/v4/locales";
import { useSnapshot } from "valtio";
import userStore from "../../../store/user.store";
import { useToast } from "../../core/components/ToastProvider";

export default function post() {

  const {user} = useSnapshot(userStore);

    const { showToast } = useToast();


  const [{ data, loading, error }, getPosts] = useAxios<any>(
    {
      url: "posts/all",
      method: "GET",
    },
    { manual: true }
  );

  const [, savePostRequest] = useAxios(
  {
    url: "",
    method: "POST",
  },
  { manual: true }
);

const handleSavePost = async (postId: string) => {
  if (!user?.id) return;

  try {
    await savePostRequest({
      url: `/users/save?userId=${user.id}&postId=${postId}`,
    });
    showToast("Post saved successfully!", 2000, "success");
  } catch (err) {
    console.error(err);
    alert("Failed to save post.");
  }
};



  useEffect(() => {
  getPosts();
}, []);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
const ionRouter = useIonRouter();
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
    <IonRow>
      <IonCol
        size="12"
        className="bg-black text-white p-4 border-b border-gray-700"
      >
        <IonRow>
          <IonCol size="12">
            <CreatePostForm postCreated={()=>getPosts()} />
          </IonCol>
          {/* <IonCol size="12" className="text-center">
            <IonText color="primary">Show 172 posts</IonText>
          </IonCol> */}

          <IonCol size="12" className="mt-5">
          <ExternalWebModal
            url={activeUrl}
            isOpen={!!activeUrl}
            onClose={() => setActiveUrl(null)}
          />
          <div  className="border-t border-gray-700 mb-4 mt-3 pt-3">
            {data?.map((tweet:any,index:any) => (
              <IonRow className="mt-10" key={index}>
                <IonCol size="2" sizeSm="1.5" onClick={()=>{ionRouter.push(`/profile/${tweet.userId}`)}}>
                  <Avatar size="40" name={tweet?.authorUsername} round={true} />
                </IonCol>
                <IonCol  size="10" sizeSm="10.5">
                  <IonRow>
                    <IonCol size="10" className="text-left">
                      <div className="tweet-header-row">
                        <span className="tweet-author">{tweet.authorUsername} </span>
                        <span onClick={()=>{ionRouter.push(user?.id===tweet.userId?'/profile':`/profile/${tweet.userId}`)}} className="tweet-handle text-blue-500">@{tweet?.authorName}</span>
                      </div>
                    </IonCol>
                    <IonCol size="2" class="text-right">
                      {/* <ShareButton text="this is test share"/> */}
                      <IonIcon
                      onClick={() => handleSavePost(tweet.id)}
                        size="large"
                        icon={bookmarkOutline}
                        className="text-gray-400 cursor-pointer"
                      />
                    </IonCol>
                    <IonCol size="12">
                      <IonLabel>
                        <p className="tweet-text">
                          {renderTextWithLinks(tweet?.content, setActiveUrl)}
                        </p>
<div className="mt-3">

                        {tweet?.imageUrls?.length > 0 && (
  <div className="tweet-image-wrapper">
    {tweet.imageUrls.map((url: string, index: number) => (
      url && (<img
        key={index}
        src={url}
        alt={`tweet media ${index + 1}`}
        width={200}
        loading="lazy"
      />)
    ))}
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
  );
}

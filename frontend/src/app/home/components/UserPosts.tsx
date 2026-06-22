import {
  IonButton,
  IonCol,
  IonIcon,
  IonLabel,
  IonList,
  IonRow
} from "@ionic/react";
import {
  chatbubbleOutline,
  heartOutline,
  repeatOutline,
  shareOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import ExternalWebModal from "../../core/components/ExternalWebPanel";
import CreatePostForm from "./CreatePostForm";
import ShareButton from "../../core/components/ShareBuuton";
import useAxios from "axios-hooks";
import { ur } from "zod/v4/locales";

export default function UserPosts({userId}: {userId: string}) {

  const [{ data, loading, error }, getPosts] = useAxios<any>(
    {
      url: `/posts/user/${userId}`,
      method: "GET",
    },
    { manual: true }
  );

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
          <div  className="border-t border-gray-700 mb-4 mt-3 pt-3">
            {data?.map((tweet:any,index:any) => (
              <IonRow className="mt-10" key={index}>
                <IonCol size="2" sizeSm="1.5">
                  <Avatar size="40" name={tweet.authorName} round={true} />
                </IonCol>
                <IonCol  size="10" sizeSm="10.5">
                  <IonRow>
                    <IonCol size="10" className="text-left">
                      <div className="tweet-header-row">
                        <span className="tweet-author">{tweet.authorUsername} </span>
                        <span className="tweet-handle">@{tweet?.authorName}</span>
                      </div>
                    </IonCol>
                    <IonCol size="2" class="text-right">
                      <ShareButton text="this is test share"/>
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

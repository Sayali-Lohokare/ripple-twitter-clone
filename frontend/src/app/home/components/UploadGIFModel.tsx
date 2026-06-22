import React, { useRef, useId } from "react";
import {
  IonButton,
  IonModal,
  IonContent,
  IonIcon
} from "@ionic/react";
import GifPicker from "gif-picker-react";
import { linkOutline } from "ionicons/icons";
import { HiOutlineGif } from "react-icons/hi2";

function UploadGIFModel({ onGifSelect }: { onGifSelect: (gifUrl: string) => void }) {
  const modal = useRef<HTMLIonModalElement>(null);
  const modalId = useId(); // UNIQUE ID FOR EACH INSTANCE

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <>
      <IonButton fill="clear" id={modalId}>
        <HiOutlineGif size={35}/>

        {/* <IonIcon icon={linkOutline} /> */}
      </IonButton>

      <IonModal  ref={modal} trigger={modalId}>
        <IonContent className="ion-padding">
          <GifPicker
            onGifClick={(e) => {
              dismiss();
              onGifSelect(e.url);
            }}
            tenorApiKey="AIzaSyDuxU1Ky8kUvoit4wbkIoMnXUSC0yyVzmA"
          />
        </IonContent>
      </IonModal>
    </>
  );
}

export default UploadGIFModel;

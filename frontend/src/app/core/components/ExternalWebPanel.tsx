import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
} from "@ionic/react";
import { closeOutline, openOutline } from "ionicons/icons";

interface Props {
  url: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExternalWebModal({
  url,
  isOpen,
  onClose,
}: Props) {
  if (!url) return null;

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.9]}
      initialBreakpoint={0.9}
    >
      <IonHeader>
        <IonToolbar className="bg-black text-white">
          <IonTitle className="text-sm truncate">
            {url}
          </IonTitle>

          <IonButtons slot="end">
            <IonButton
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonIcon icon={openOutline} />
            </IonButton>

            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-black">
        <iframe
          src={url}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          title="External content"
        />
      </IonContent>
    </IonModal>
  );
}

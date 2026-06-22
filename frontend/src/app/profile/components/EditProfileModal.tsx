import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonTextarea,
  IonAvatar,
} from "@ionic/react";
import { closeOutline, cameraOutline } from "ionicons/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar className="bg-black text-white">
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>

          <IonTitle className="text-base font-semibold">
            Edit profile
          </IonTitle>

          <IonButtons slot="end">
            <IonButton
              className="bg-white text-black rounded-full px-4 text-sm font-semibold"
            >
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-black text-white">
        {/* Cover Image */}
        <div className="relative h-44 bg-black flex items-center justify-center">
          <div className="absolute inset-0 bg-black"></div>

          <IonButton
            fill="clear"
            className="z-10 bg-gray-800 rounded-full w-12 h-12"
          >
            <IonIcon icon={cameraOutline} className="" />
          </IonButton>
        </div>
        {/* Profile Image and Form */}
        <div className="px-4 pt-16">
          <div className="relative w-32 h-32 -mt-20 mb-4">
            <IonAvatar className="w-32 h-32 border-4 border-black"> 
              <img src="/assets/profile-pic.jpg" alt="Profile" />
            </IonAvatar>
            <IonButton
              fill="clear"
              className="absolute bottom-0 right-0 bg-gray-800 rounded-full w-10 h-10"
            >
              <IonIcon icon={cameraOutline} className="" />
            </IonButton>
          </div>
          <form className="space-y-4">
            <IonInput
              placeholder="Name"
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2"
            />
            <IonTextarea
              placeholder="Bio"
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2"
              rows={3}
            />
            <IonInput
              placeholder="Location"
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2"
            />
            <IonInput
              placeholder="Website"
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2"
            />
          </form>
        </div>
      </IonContent>
    </IonModal>
  );
}
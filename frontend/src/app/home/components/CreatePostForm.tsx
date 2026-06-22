import { zodResolver } from "@hookform/resolvers/zod";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonLoading,
  IonRow,
  IonText,
  IonTextarea,
} from "@ionic/react";
import useAxios from "axios-hooks";
import {
  cameraOutline,
  closeOutline,
  happyOutline,
  imageOutline,
  linkOutline,
  locationOutline,
} from "ionicons/icons";
import Avatar from "react-avatar";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { CreatePostFormData, createPostFormSchema } from "../home.model";
import { use, useState } from "react";
import GifPicker from "gif-picker-react";
import UploadGIFModel from "./UploadGIFModel";
import { Camera, CameraResultType } from '@capacitor/camera';
import { useSnapshot } from "valtio";
import userStore from "../../../store/user.store";

export default function CreatePostForm({postCreated}: {postCreated?: ()=>void}) {
  const MAX_LENGTH = 250; // twitter style

  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostFormSchema),
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  });
const { user, token, isAuthenticated } = useSnapshot(userStore);

  const [{ loading }, createPost] = useAxios(
    {
      url: "/posts/create",
      method: "POST",
    },
    { manual: true }
  );

  const [{ loading: uploading }, uploadImage] = useAxios(
  {
    url: "/images/upload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  },
  { manual: true }
);

const webPathToFile = async (webPath: string): Promise<File> => {
  const response = await fetch(webPath);
  const blob = await response.blob();
  return new File([blob], `image-${Date.now()}.jpg`, {
    type: blob.type,
  });
};

const uploadImageAndGetUrl = async (webPath: string): Promise<string> => {
  const file = await webPathToFile(webPath);

  const formData = new FormData();
  formData.append("file", file);

  const response = await uploadImage({ data: formData });
  return response.data.imageUrl;
};

  const [selectedGif, setSelectedGif] = useState<string | null>(null);
const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onPostSubmit: SubmitHandler<CreatePostFormData> = async (e) => {
    
  
     createPost({data: {userId:user?.id,content:e.message,imageUrls:[selectedGif,selectedImage]}}).then((response)=>{
      console.log("Post created:",response.data);
      // Reset form
      form.reset();
      setSelectedGif(null);
      setSelectedImage(null);
      postCreated && postCreated()
     }).catch((error)=>{
      console.error("Error creating post:",error);
     })
  };

  const takePicture = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 85,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    if (image.webPath) {
      const imageUrl = await uploadImageAndGetUrl(image.webPath);
      setSelectedImage(imageUrl);
    }
  } catch (err) {
    console.error("Camera failed", err);
  }
};



  return (
    <form onSubmit={form.handleSubmit(onPostSubmit)}>
      <IonRow className="items-start mt-3">

        {/* Avatar */}
        <IonCol size="2" sizeSm="1.5">
          <Avatar size="50" round={true} />
        </IonCol>

        {/* Textarea */}
        <IonCol className="align-middle" size="10" sizeSm="10.5">
          <Controller
            control={form.control}
            name="message"
            render={({ field }) => (
              <>
                <IonTextarea
                  value={field.value}
                  onIonChange={(e) => field.onChange(e.detail.value)}
                  onIonBlur={field.onBlur}
                  placeholder="What's happening?"
                  autoGrow
                   counter={true} 
                  rows={2}
                  maxlength={MAX_LENGTH}
                  className={
                    form.formState.errors.message ? "ion-invalid" : ""
                  }
                  errorText={form.formState.errors?.message?.message}
                />

                
              </>
            )}
          />
        </IonCol>
        <IonCol size="12" class="mt-3">
  {selectedGif && (
    <div className="relative inline-block mt-2">
      <img
        src={selectedGif}
        alt="gif"
        className="rounded-lg max-h-48 object-cover"
      />

      {/* Remove Icon */}
      <button
        type="button"
        onClick={() => setSelectedGif(null)}
        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
      >
        <IonIcon icon={closeOutline} />
      </button>
    </div>
  )}

  {selectedImage && (
    <div className="relative inline-block mt-2">
      <img
        src={selectedImage}
        alt="captured"
        className="rounded-lg max-h-48 object-cover"
      />

      <button
        type="button"
        onClick={() => setSelectedImage(null)}
        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
      >
        <IonIcon icon={closeOutline} />
      </button>
    </div>)}
</IonCol>

        {/* Action Buttons Row */}
        <IonCol size="8" className="flex items-center space-x-1 mt-3">
          <IonButton fill="clear" size="small" onClick={takePicture}>
            <IonIcon size="large" icon={imageOutline} />
          </IonButton>

          <IonButton fill="clear" size="small" onClick={takePicture}>
            <IonIcon size="large" icon={cameraOutline} />
          </IonButton>

          {/* <IonButton fill="clear" size="small"> */}
          <UploadGIFModel onGifSelect={(e)=>setSelectedGif(e)}/>  
          {/* </IonButton> */}

          <IonButton fill="clear" size="small">
            <IonIcon size="large" icon={happyOutline} />
          </IonButton>

          {/* <IonButton fill="clear" size="small">
            <IonIcon size="large" icon={locationOutline} />
          </IonButton> */}
        </IonCol>

        {/* POST Button */}
        <IonCol size="4" className="text-right mt-3">
          <IonButton
            type="submit"
            color="secondary"
            shape="round"
          >
            {loading && <IonLoading />}
            <IonText>POST</IonText>
          </IonButton>
        </IonCol>

      </IonRow>
    </form>
  );
}

import React from "react";
import { IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";

type ShareProps = {
  title?: string;
  text?: string;
  url?: string;
  icon?: string;
  className?: string;
  onError?: (err: unknown) => void;
};

const ShareButton: React.FC<ShareProps> = ({
  title = "Share",
  text = "",
  url = "",
  icon = shareOutline,
  className = "",
  onError,
}) => {
  const handleShare = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title,
          text,
          url,
          dialogTitle: title,
        });
      } else if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url || text);
        alert("Link copied to clipboard");
      }
    } catch (err) {
      console.error("Share failed:", err);
      onError?.(err);
    }
  };

  return (
    <IonIcon
    size="large"
      icon={icon}
      className={className}
      onClick={handleShare}
      style={{ cursor: "pointer" }}
    />
  );
};

export default ShareButton;

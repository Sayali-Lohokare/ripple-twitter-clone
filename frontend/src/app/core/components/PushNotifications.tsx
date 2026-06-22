import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { FCM } from "@capacitor-community/fcm";
import useAxios from "axios-hooks";
import { useSnapshot } from "valtio";
import userStore from "../../../store/user.store";

export default function PushNotificationsSetup() {
  const {token}= useSnapshot(userStore);

  // ✅ Hook is called at top level
  const [{ loading, error }, sendFcmToken] = useAxios(
    {
      url: "/users/me/fcm-token",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initPush();
    } else {
      console.log("Push notifications are not supported on web");
    }
  }, []);

  const initPush = async () => {
    try {
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive !== "granted") {
        console.log("Push permission not granted");
        return;
      }

      await PushNotifications.register();

      const result = await FCM.getToken();
      console.log("FCM Token:", result.token);

      // ✅ Safe call
      await sendFcmToken({
        data: { fcmToken: result.token },
      });

      // Foreground notifications
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
          console.log("Notification received", notification);
        }
      );

      // Notification tapped
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (action) => {
          console.log("Notification tapped", action);
        }
      );

    } catch (err) {
      console.error("Push init failed:", err);
    }
  };

  return null;
}

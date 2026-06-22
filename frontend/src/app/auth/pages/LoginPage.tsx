import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner,
  IonRow,
  IonCol,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoginFormData, loginFormSchema } from "../auth.model";
import useAxios from "axios-hooks";
import { setAuthData } from "../../../store/user.store";




export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const ionRouter = useIonRouter();

  const [{ loading }, loginUser] = useAxios(
    {
      url: "/auth/login",
      method: "POST",
    },
    { manual: true }
  );

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login:", data);
const response: any = await loginUser({ data });
setAuthData(response.data);

    // Replace with your API call
    // await new Promise((res) => setTimeout(res, 1500));
ionRouter.push("/home", "root");  
  };

  return (
    <IonPage>
      <IonContent className="bg-white">
        <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
          <IonCol size="12" sizeMd="6" sizeLg="4">

            <IonRow className="ion-text-center mb-4">
              <IonCol>
                <h1 className="text-2xl font-bold">Login</h1>
              </IonCol>
            </IonRow>

            {/* Email */}
            <IonItem className="rounded-xl">
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                {...register("email")}
                placeholder="Enter your email"
              />
            </IonItem>
            {errors.email && (
              <IonText color="danger">{errors.email.message}</IonText>
            )}

            {/* Password */}
            <IonItem className="rounded-xl mt-3">
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                {...register("password")}
                placeholder="Enter your password"
              />
            </IonItem>
            {errors.password && (
              <IonText color="danger">{errors.password.message}</IonText>
            )}

            {/* Login Button */}
            <IonRow className="mt-4">
              <IonCol>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  {loading ? <IonSpinner name="crescent" /> : "Login"}
                </IonButton>
              </IonCol>
            </IonRow>

            {/* Sign Up Link */}
            <IonRow className="ion-text-center mt-3">
              <IonCol>
                <IonText>
                  Don't have an account?{" "}
                  <a href="/register" className="text-blue-600">Sign Up</a>
                </IonText>
              </IonCol>
            </IonRow>

          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
}

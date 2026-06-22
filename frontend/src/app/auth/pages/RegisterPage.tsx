import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonRow,
  IonCol,
  IonSpinner,
  IonTitle,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import DatePicker from "../../core/components/DatePicker";
import CountryPicker from "../../core/components/CountryPicker";
import { useIonRouter } from "@ionic/react";
import useAxios from "axios-hooks";
import userStore from "../../../store/user.store";

// Validation schema
const signupSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  username: z.string().min(1, "user name is required"),
  name: z.string().min(1, "name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  country: z.string().min(1, "Country is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // const [loading, setLoading] = useState(false);
  const ionRouter = useIonRouter();


  const [{ loading }, registerUser] = useAxios(
    {
      url: "/users/register",
      method: "POST",
    },
    { manual: true }
  );

  const onSubmit = async (data: SignupFormData) => {
    console.log("Signup:", data);
    // registerUser({ data })
        const response: any = await registerUser({ data });
console.log("Registration Response:", response);
        userStore.user = response.data;

    await new Promise((res) => setTimeout(res, 1500));
    // setLoading(false);
ionRouter.push("/login", "root");  
};

  return (
    <IonPage>
      <IonContent className="bg-white">
        <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: "100%" }}>
          <IonCol size="12" sizeMd="6" sizeLg="4">

            <IonRow className="ion-text-center mb-4">
              <IonCol>
                <IonTitle>Sign Up</IonTitle>
              </IonCol>
            </IonRow>

            {/* First Name */}
            <IonItem className="rounded-xl">
              <IonLabel position="stacked">User Name</IonLabel>
              <IonInput type="text" {...register("username")} placeholder="Enter username" />
            </IonItem>
            {errors.username && <IonText color="danger">{errors.username.message}</IonText>}
<IonItem className="rounded-xl">
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput type="text" {...register("name")} placeholder="Enter name" />
            </IonItem>
            {errors.name && <IonText color="danger">{errors.name.message}</IonText>}

            {/* Last Name */}
            <IonItem className="rounded-xl mt-3">
              <IonLabel position="stacked">Bio</IonLabel>
              <IonInput type="text" {...register("bio")} placeholder="Enter Bio here" />
            </IonItem>
            {errors.bio && <IonText color="danger">{errors.bio.message}</IonText>}

            {/* Email */}
            <IonItem className="rounded-xl mt-3">
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput type="email" {...register("email")} placeholder="Enter your email" />
            </IonItem>
            {errors.email && <IonText color="danger">{errors.email.message}</IonText>}

            {/* Password */}
            <IonItem className="rounded-xl mt-3">
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput type="password" {...register("password")} placeholder="Enter your password" />
            </IonItem>
            {errors.password && <IonText color="danger">{errors.password.message}</IonText>}

            {/* Country Picker Component */}
            <CountryPicker
              control={control}
              name="country"
              error={errors.country?.message}
            />

            {/* Date of Birth */}
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <DatePicker
                  label="Date of Birth"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.dateOfBirth?.message}
                />
              )}
            />

            {/* Signup Button */}
            <IonRow className="mt-4">
              <IonCol>
                <IonButton expand="block" shape="round" onClick={handleSubmit(onSubmit)} disabled={loading}>
                  {loading ? <IonSpinner name="crescent" /> : "Sign Up"}
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center mt-3">
              <IonCol>
                <IonText>
                  Already have an account ?{" "}
                  <a href="/auth/login" className="text-blue-600">Login</a>
                </IonText>
              </IonCol>
            </IonRow>

          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
}

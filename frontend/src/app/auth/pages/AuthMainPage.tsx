import { IonButton, IonCard, IonCol, IonContent, IonLabel, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react'
import React from 'react'

export default function AuthMainPage() {
  const ionRouter = useIonRouter();
  return (
    <IonPage>
      <IonContent>
        
      <IonRow className='h-full'>
        {/* <IonCol size='7'>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"><g><path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path></g></svg>
          </IonCol> */}
        <IonCol size='5'>
          <IonRow class='h-full flex justify-center'>

          <IonCol size='12'>
            <IonText>Happening Now</IonText>
          </IonCol>
          <IonCol size='12' className='text-center'>
            <IonCard>
              <IonButton expand='block' onClick={()=>ionRouter.push("/login")}>Log in</IonButton>
              <IonButton expand='block' onClick={()=>ionRouter.push("/register")} fill='outline'>Sign up</IonButton>
            </IonCard>

            
          </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
          </IonContent>
    </IonPage>
  )
}

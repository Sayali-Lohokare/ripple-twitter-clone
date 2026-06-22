import { IonToast } from "@ionic/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface ToastContextType {
  showToast: (message: string, duration?: number, color?: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState<string | undefined>("primary");
  const [duration, setDuration] = useState(2000);

  const showToast = (msg: string, dur: number = 2000, col: string = "primary") => {
    setMessage(msg);
    setDuration(dur);
    setColor(col);
    setIsOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <IonToast
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        message={message}
        duration={duration}
        color={color}
        position="bottom"
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

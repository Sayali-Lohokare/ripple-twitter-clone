import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";


// Define the shape of your user object; you can adjust this as needed
// type User = {
//   id: string;
//   name: string;
//   // add other fields here as needed
// } | null;

type User = any;
type AuthContextType = {
  user: any;
  login: (data: User) => Promise<void>;
  logout: () => void;
};

// Create the context with an initial undefined (we'll handle it in the hook)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<any>("user", null);
//   const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: any) => {
    setUser(data);
    // navigate("/");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    // navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
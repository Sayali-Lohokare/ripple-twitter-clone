import { proxy, subscribe } from "valtio";

/* =======================
   User model (SAFE)
   ======================= */
export interface User {
  id: string;
  email: string;
  username: string;
  name: string | null;
  bio: string | null;
  profileImage: string | null;
  coverImage: string | null;
  dateOfBirth: string;
  country: string;
  fcmToken: string | null;
  followers: string[];
  following: string[];
  savedPosts: string[];
}

/* =======================
   Store state
   ======================= */
interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/* =======================
   Initial state (rehydrate)
   ======================= */
const initialState: UserState =
  JSON.parse(localStorage.getItem("userStore") || "null") ?? {
    user: null,
    token: null,
    isAuthenticated: false,
  };

/* =======================
   Valtio store
   ======================= */
const userStore = proxy<UserState>(initialState);

/* =======================
   Persist to localStorage
   ======================= */
subscribe(userStore, () => {
  localStorage.setItem("userStore", JSON.stringify(userStore));
});

/* =======================
   Actions
   ======================= */
export const setAuthData = (data: {
  user: any;
  token: string;
}) => {
  // Remove sensitive fields
  const { password, ...safeUser } = data.user;

  userStore.user = safeUser;
  userStore.token = data.token;
  userStore.isAuthenticated = true;
};

export const logout = () => {
  userStore.user = null;
  userStore.token = null;
  userStore.isAuthenticated = false;
  localStorage.removeItem("userStore");
};

export default userStore;

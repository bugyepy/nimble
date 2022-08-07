import { onAuthStateChanged, User as firebaseUser } from "firebase/auth";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/client";
import { User } from "../types/user";

type ContextType = {
  fbUser: firebaseUser | null | undefined;
  isLoading: boolean;
  user: User | null | undefined;
};
const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
  user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [fbUser, setFbUser] = useState<firebaseUser | null>();

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    onAuthStateChanged(auth, (resultUser) => {
      unsubscribe?.();
      setFbUser(resultUser);

      if (resultUser) {
        setIsLoading(true);
        const ref = doc(db, `users/${resultUser.uid}`);
        unsubscribe = onSnapshot(ref, (snap) => {
          setUser(snap.data() as User);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ fbUser, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

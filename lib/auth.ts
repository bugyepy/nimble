import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/client";

export const login = () => {
  const authProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, authProvider)
    .then((result) => {
      console.log(result);
      alert(`${result.user.displayName}さん、ようこそ！`);
    })
    .catch((e) => {
      alert(e.message);
      console.log(e);
    });
};

export const logout = () => {
  return signOut(auth).then(() => {
    alert("ログアウトしました");
  });
};
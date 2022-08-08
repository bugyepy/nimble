import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { login, logout } from "../lib/auth";
import styles from "../styles/Home.module.css";

const LoginPage = () => {
  const { fbUser, user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!user && fbUser) {
    router.push("/create-account");
  }

  const LoginButton = () => {
    if (fbUser?.uid) {
      return (
        <div>
          <Button onClick={logout}>ログアウト</Button>
          <p className="block mt-2 text-sm text-slate-400">
            投稿・閲覧は
            <Link href="/">
              <a className="mt-2 text-sm text-green-400">こちら</a>
            </Link>
            から
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={login}>ログイン</Button>
          <Link href="/posts">
            <a className="block mt-2 text-sm text-slate-400">
              ログインせずに見る
            </a>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className={styles.main}>
      <LoginButton />
    </div>
  );
};

export default LoginPage;

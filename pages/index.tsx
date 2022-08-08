import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { logout } from "../lib/auth";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { user, fbUser, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nimble</title>
        <meta name="description" content="Nimble - is Simple Blog." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="font-bold text-lg">ようこそ、{user?.nickname}</h1>
        <div>
          <p>
            投稿一覧は
            <Link href="/posts">
              <a className="text-green-600 font-bold">ココ</a>
            </Link>
          </p>
          <p>
            新規に投稿する場合は
            <Link href="/create-post">
              <a className="text-green-600 font-bold">ココ</a>
            </Link>
          </p>
        </div>
        <Button onClick={logout}>
          <p className="mt-2">ログアウト</p>
        </Button>
      </main>
    </div>
  );
};

export default Home;

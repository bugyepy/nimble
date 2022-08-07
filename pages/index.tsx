import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
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
        <p>ようこそ、{user?.nickname}</p>
        <p>
          あなたの投稿一覧は
          <Link href="/posts">ココ</Link>
        </p>
        <p>
          新規に投稿する=&gt;
          <Link href="/create-post">ココ</Link>
        </p>
      </main>
    </div>
  );
};

export default Home;

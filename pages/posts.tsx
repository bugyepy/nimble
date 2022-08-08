import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/client";
import { Post } from "../types/post";
import { User } from "../types/user";

const Posts = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));

    getDocs(q).then((snap) => {
      const docs = snap.docs.map((doc) => doc.data());
      setPosts(docs as Array<Post>);
    });
  }, []);

  // TODO: AuthorIdをuser.nicknameにする

  return (
    <div className="container ">
      {posts.map((post) => (
        <a
          key={post.id}
          className="block rounded-md shadow my-4 p-4 border border-slate-400"
          href={`/posts/${post.id}`}
        >
          <p>{post.title}</p>
          <p className="text-slate-500">
            {format(post.createdAt, "yyyy年MM月dd日")}
          </p>
          <p>Author: {post?.authorId}</p>
          <p className="text-slate-400 text-sm">
            {formatDistanceToNow(post.createdAt, { locale: ja })}前
          </p>
        </a>
      ))}
    </div>
  );
};

const PostsPage = () => {
  return (
    <div className="container pt-6">
      <Link href="/">
        <a className="block text-slate-400 text-sm">トップに戻る</a>
      </Link>
      <h1 className="font-bold text-lg">Posts</h1>
      <p>投稿一覧</p>
      <Posts />
    </div>
  );
};

export default PostsPage;

import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { Post } from "../types/post";

const Posts = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const { user, fbUser } = useAuth();

  useEffect(() => {
    if (fbUser) {
      const q = query(
        collection(db, "posts"),
        where("authorId", "==", fbUser?.uid)
      );

      getDocs(q).then((snap) => {
        const docs = snap.docs.map((doc) => doc.data());
        setPosts(docs as Array<Post>);
      });
    }
  }, [fbUser]);

  return (
    <div className="container">
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
          <p>{user?.name}</p>
          {/* <p>{formatDistanceToNow(post.createdAt, { locale: ja })}前</p> */}
        </a>
      ))}
    </div>
  );
};

const PostsPage = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1 className="font-bold text-lg">Posts</h1>
      <p>{user?.nickname}の投稿一覧</p>
      <Posts />
    </div>
  );
};

export default PostsPage;

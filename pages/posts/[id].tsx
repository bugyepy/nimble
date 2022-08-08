import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/client";
import { Post } from "../../types/post";

const PostsDetailPage = () => {
  const [post, setPost] = useState<Post>();
  const router = useRouter();
  const postId = router.query.id;

  useEffect(() => {
    const ref = doc(db, `posts/${postId}`);
    getDoc(ref).then((snap) => {
      setPost(snap.data() as Post);
    });
  }, [postId]);

  if (!post) {
    return null;
  }

  return (
    <div className="container pt-6">
      <Link href="/posts">
        <a className="block text-slate-400 text-sm">投稿一覧に戻る</a>
      </Link>
      <h1 className="font-bold text-lg">{post.title}</h1>
      <p>{post.body}</p>
      {/* <p>{postId}]</p> */}
    </div>
  );
};

export default PostsDetailPage;

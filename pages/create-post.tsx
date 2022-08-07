import classNames from "classnames";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { Post } from "../types/post";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }

    return null;
  }

  const submit = (data: Post) => {
    const ref = doc(collection(db, "posts"));
    const post: Post = {
      id: ref.id,
      title: data.title,
      body: data.body,
      createdAt: Date.now(),
      updatedAt: null,
      authorId: fbUser.uid,
    };

    setDoc(ref, post).then(() => {
      alert("作ったよ");
    });
  };

  return (
    <div>
      <h1>CreatePost</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label className="block mb-0.5" htmlFor="title">
            タイトル
          </label>
          <input
            autoComplete="title"
            className={classNames(
              "rounded border",
              errors.title ? "border-red-500" : "border-slate-500"
            )}
            {...register("title", {
              required: "必須",
              maxLength: { value: 50, message: "50文字まで" },
            })}
            id="title"
            name="title"
            type="text"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="body">
            本文
          </label>
          <input
            autoComplete="body"
            className={classNames(
              "rounded border",
              errors.body ? "border-red-500" : "border-slate-500"
            )}
            {...register("body", {
              required: "必須",
              maxLength: { value: 4000, message: "4000文字まで" },
            })}
            id="body"
            name="body"
            type="text"
          />
          {errors.body && (
            <p className="text-red-500">{errors.body?.message}</p>
          )}
        </div>

        <Button>投稿するよ</Button>
      </form>
    </div>
  );
};

export default CreatePost;

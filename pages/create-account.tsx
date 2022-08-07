import classNames from "classnames";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { User } from "../types/user";

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  }

  const submit = (data: User) => {
    const ref = doc(db, `users/${fbUser.uid}`);
    setDoc(ref, data).then(() => {
      alert("作ったよ");
      router.push("/");
    });
  };

  return (
    <div className="container">
      <h1>アカウント作るよ</h1>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label className="block mb-0.5" htmlFor="name">
            名前
          </label>
          <input
            autoComplete="name"
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-500"
            )}
            {...register("name", {
              required: "必須",
              maxLength: { value: 50, message: "50文字まで" },
            })}
            id="name"
            name="name"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="nickname">
            ニックネーム
          </label>
          <input
            autoComplete="off"
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-500"
            )}
            {...register("nickname", {
              required: "必須",
              maxLength: { value: 50, message: "50文字まで" },
            })}
            id="nickname"
            name="nickname"
            type="text"
          />
          {errors.nickname && (
            <p className="text-red-500">{errors.nickname?.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-0.5" htmlFor="profile">
            プロフィール
          </label>
          <textarea
            className={classNames(
              "rounded border",
              errors.name ? "border-red-500" : "border-slate-500"
            )}
            defaultValue=""
            {...register("profile", {
              required: "必須",
              maxLength: { value: 250, message: "250文字まで" },
            })}
            id="profile"
            name="profile"
          />
          <p className="text-sm text-slate-400 leading-none">
            {watch("profile")?.length || 0}/255
          </p>
          {errors.profile && (
            <p className="text-red-500">{errors.profile?.message}</p>
          )}
        </div>

        <Button>アカウント作るよ</Button>
      </form>
    </div>
  );
};

export default CreateAccount;

import React from "react";
import Button from "../components/button";
import { login, logout } from "../lib/auth";

const LoginPage = () => {
  return (
    <div>
      <h1>login</h1>
      <Button type="button" onClick={login}>
        ログイン
      </Button>
      <Button type="button" onClick={logout}>
        ログアウト
      </Button>
    </div>
  );
};

export default LoginPage;

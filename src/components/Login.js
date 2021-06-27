import React from "react";
import "firebase/app";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { auth } from "./Firebase";
import firebase from "firebase/app";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcom User</h2>

        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined />
          Sign in with google
        </div>
        <br />
        <br />
        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined />
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;

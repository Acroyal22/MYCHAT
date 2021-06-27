import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyD5JU_5kpo5ciTs5YMebLPyU_KR5kvj5bc",
    authDomain: "uni-chat-55ecf.firebaseapp.com",
    projectId: "uni-chat-55ecf",
    storageBucket: "uni-chat-55ecf.appspot.com",
    messagingSenderId: "520864545061",
    appId: "1:520864545061:web:5cf3f84d6d7a91db4282cc"
  }).auth();


import React, { useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import { auth } from "./Firebase";
import { useAuth } from "./AuthContext";
import axios from "axios";
// import env from "dotenv";
// env.config();

const Chat = () => {
  // const [, setLoading] = useState(true);
  const histroy = useHistory();
  const { user } = useAuth();

  let { displayName, email } = user;

  const handleOnClick = async () => {
    await auth.signOut();
    histroy.push("./");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "user-photo.jpeg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      histroy.push("./");
      return;
    }
    axios
      .get("http://api.chatengine.io/user/me", {
        headers: {
          "Project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user.id": user.uid,
        },
      })
      .then(() => {
        // setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.displayName);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.userName);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "Private-Key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => {
              // setLoading(false)
            })
            .catch((error) => console.log(error));
        });
      });
  }, [user, histroy]);

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">MyChat</div>
        <div className="logout-tab" onClick={handleOnClick}>
          Logout
        </div>
      </div>

      <div>uid: {user.uid}</div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={displayName || email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chat;

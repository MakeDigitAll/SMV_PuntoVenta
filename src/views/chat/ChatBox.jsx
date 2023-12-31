import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import UserImage from "../user/UserImage";
import { format } from "timeago.js";
import "./ChatBox.css";
import InputEmoji from "react-input-emoji";
import { Button, Spinner } from "@nextui-org/react";
import { RiPlaneLine } from "react-icons/ri";
const ChatBox = (chat, setSendMessage, receiveMessage) => {
  const [userData, setUserData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId == chat?.id) {
      //setMessages([...messages, receiveMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveMessage]);
  useEffect(() => {
    const getUser = async (userInfor) => {
      try {
        const { data } = await axios.get(
          `https://localhost:4000/api/user/${userInfor}`
        );
        setUserData(data);
      } catch (err) {
        
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    };
    let userInfor = null;
    chat.chat.receptor === auth.getUser()?.id
      ? (userInfor = chat.chat.receptor)
      : (userInfor = chat.chat.emisor);
    if (chat !== null) getUser(userInfor);
  }, [auth, chat]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `https://localhost:4000/api/chat/getMessages/${chat.chat.id}`
        );
        setMessages(data);
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
        
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  const handleChangeMessage = (newMessages) => {
    setNewMessages(newMessages);
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      senderId: auth.getUser()?.id,
      text: newMessages,
      chatId: chat.chat.id,
    };
    try {
      const response = await fetch(
        "https://localhost:4000/api/chat/sendMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, data]);
        setNewMessages("");
      } else {
        const json = await response.json();
        toast.error(json.body.error, { theme: "colored" });
      }
    } catch (error) {
      toast.warning(error.message);
    }
    let receiverId = null;
    chat.chat.receptor !== auth.getUser()?.id
      ? receiverId == chat.chat.receptor
      : receiverId == chat.chat.emisor;
    setSendMessage({ ...messages, receiverId });
  };
  return (
    <div className="ChatBox-container">
      <>
        <div className="chat-header">
          <div className="follower">
            <UserImage idUsuario={userData?.id} designType="lista" />
            <div className="name" style={{ fontSize: "0.9rem" }}>
              <span>
                {userData?.nombre} {userData?.apellido}
              </span>
            </div>
          </div>
        </div>
        <hr
          style={{
            width: "95%",
            border: "0.1px solid #ececec",
            marginTop: "20px",
          }}
        />
        {messages.length < 0 ? (
          <Spinner />
        ) : (
          <>
            <div className="chat-body">
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <div
                    className={
                      parseInt(message.remitenteId) === auth.getUser()?.id
                        ? "message own"
                        : "message your"
                    }
                  >
                    <div className="message-text" key={message.id}>
                      {message.mensaje}
                    </div>
                    <div className="message-time">
                      {format(message.createdAt)}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div></div>
          </>
        )}
        <div className="chat-sender">
          <div>+</div>
          <InputEmoji
            value={newMessages}
            onChange={handleChangeMessage}
            cleanOnEnter
            placeholder="Escribe un mensaje"
          />
          <Button endContent={RiPlaneLine} onClick={handleSendMessage}>
            Enviar
          </Button>
        </div>
      </>
    </div>
  );
};

export default ChatBox;

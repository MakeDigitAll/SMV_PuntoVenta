import "./Chat.css";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { Spacer } from "@nextui-org/react";
import { io } from "socket.io-client";
const Chat = () => {
  const auth = useAuth();
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const { user } = auth.getUser().id;
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", auth.getUser()?.id);
    socket.current.on("get-user", (users) => {
      setOnlineUsers(users);
    });
  }, [auth, user]);
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.on("recieve-message", (data) => {
        setReceiveMessage(data);
      });
    }
  });
  useEffect(() => {
    const getChats = async () => {
      try {
        const API = axios.create({ baseURL: "http://localhost:4000/api" });
        const { data } = await API.get(`/chat/${auth.getUser()?.id}`);
        setChats(data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [auth]);
  return (
    <div>
      <Spacer y={6} />
      <div className="Chat">
        <div className="Left-side-chat">
          <div className="Chat-list">
            {chats.map((chat) => (
              <div key={chat.id} onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} />
              </div>
            ))}
          </div>
        </div>
        <div className="Right-side-chat">
          {currentChat === null ? (
            <div className="No-chat">
              <h1>Selecciona un chat para comenzar</h1>
            </div>
          ) : (
            <div className="No-chat">
              <ChatBox
                chat={currentChat}
                setSendMessage={setSendMessage}
                receiveMessage={receiveMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

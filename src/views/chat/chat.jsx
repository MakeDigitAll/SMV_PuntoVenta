import "./Chat.css";
import Header from "../../components/header/headerC/Header";
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
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { user } = auth.getUser()?.id;
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  });
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", auth.getUser()?.id);
    socket.current.on("get-user", (users) => {
      setOnlineUsers(users);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
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
      <Header />
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
          {currentChat === null ? ( // Si no hay ningun chat seleccionado
            <div className="No-chat">
              <h1>Selecciona un chat para comenzar</h1>
            </div>
          ) : (
            <div className="No-chat">
              <ChatBox chat={currentChat} setSendMessage={setSendMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

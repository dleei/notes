import { FC, useEffect, useState } from "react";
import { Button, Input, Message as Toast, Modal, Alert } from "@arco-design/web-react";
import { io } from "socket.io-client";
import dayjs from "dayjs";

import ChatWrapper from "./style";
import Message from "../../components/Message";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { data } from "../../data/index.json";
import type { IMessage } from "../../types/message";

const socket = io(`http://localhost:${import.meta.env.VITE_SOCKET_PORT}`);

const Chat: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getSenderId = () => {
    return localStorage.getItem("chatId");
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("chatUser");
    if (!savedUser) {
      setShowUserModal(true);
    }
    // 监听连接事件
    socket.on("connect", () => {
      console.log("成功连接socket服务🎉");
    });
    // 监听欢迎事件
    socket.on("welcome", ({ id }) => {
      // console.log("收到欢迎消息:", msg);
      localStorage.setItem("chatId", id);
    });

    // 监听消息事件
    socket.on("chatMessage", (newMsg) => {
      setMessages((prev) => [
        ...prev,
        {
          ...newMsg,
          type: newMsg.senderId === getSenderId() ? "self" : "other",
        },
      ]);
    });

    // 监听消息事件
    socket.on("newMessage", (msg) => {
      console.log("收到新消息:", msg);
      setMessages((prev) => [
        ...prev,
        {
          ...msg,
          type: socket.id?.includes(msg.senderId) ? "self" : "other",
        },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("chatMessage");
    };
  }, []);

  const sendMsg = () => {
    if (!inputValue) {
      Toast.error({ content: "请输入消息内容" });
      return;
    }

    const userData = JSON.parse(localStorage.getItem("chatUser") || "{}");
    const newMessage = {
      content: inputValue,
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      senderId: socket.id,
      author: userData.username || "guest",
    };

    socket.emit("chatMessage", newMessage);

    setInputValue("");
  };

  const handleUserSubmit = () => {
    const userData = {
      username,
      password,
      isGuest: !username,
      lastLogin: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    localStorage.setItem("chatUser", JSON.stringify(userData));
    setShowUserModal(false);
  };

  return (
    <ChatWrapper>
      <Modal
        title="设置用户身份"
        visible={showUserModal}
        onOk={handleUserSubmit}
        onCancel={() => setShowUserModal(false)}
        maskClosable
        simple
      >
        <Input
          placeholder="用户名（可选）"
          value={username}
          onChange={setUsername}
          className="mb-2"
        />
        <Input.Password
          placeholder="密码（可选）"
          value={password}
          onChange={setPassword}
        />
        <Alert className="mt-3" type="info" content="不设置将作为访客进入公共聊天" />
      </Modal>

      <div className="home m-center common-with">
        <div className="list">
          {data.map((item) => (
            <Card info={{ name: item.author }} key={item.id}></Card>
          ))}
        </div>

        <div className="content_chat">
          <div className="content">
            {messages.length === 0 && <div className="empty-background"></div>}

            {messages.map((item) => {
              return (
                <Message
                  key={item.time}
                  content={item.content}
                  type={item.type}
                ></Message>
              );
            })}
          </div>

          <div className="chat">
            <div className="add mr-2">
              <Icon name="Add"></Icon>
            </div>
            <Input
              className="input"
              placeholder="可按下回车发送消息"
              size="large"
              onPressEnter={sendMsg}
              value={inputValue}
              onChange={setInputValue}
              addBefore={<Icon name="Smile"></Icon>}
            />
            <Button className="ml-4 send" type="primary" size="large" onClick={sendMsg}>
              发送
            </Button>
          </div>
        </div>
      </div>
    </ChatWrapper>
  );
};

export default Chat;

import { FC, useState } from "react";
import ChatWrapper from "./style";
import Message from "../../components/Message";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { Button, Input, Message as Toast } from "@arco-design/web-react";

import { data } from "../../data/index.json";

const Chat: FC = () => {
  const [inputValue, setInputValue] = useState("");

  /**
   * 按下回车键
   */
  const onEnter = () => {
    console.log(inputValue);
  };
  /**
   *  用户输入消息
   * @param val 输入框的值
   */
  const onInput = (val: string) => {
    setInputValue(val);
  };

  // 发送消息
  const sendMsg = () => {
    if (!inputValue) return Toast.error("请输入消息");

    setInputValue("");
  };
  return (
    <ChatWrapper>
      <div className="home m-center common-with">
        {/* 左侧在线人数及信息卡片 */}
        <div className="list">
          {/* <div className="text-2xl">在线人数 {data.length}</div> */}
          {data.map((item) => {
            return <Card info={{ name: item.author }} key={item.id}></Card>;
          })}
        </div>

        <div className="content_chat">
          <div className="content">
            {data.map((item) => (
              <Message
                info={{
                  msg: item.content,
                  type: item.type,
                  time: item.time,
                }}
                key={item.id}
              />
            ))}
          </div>

          {/* 输入消息区域 */}
          <div className="chat">
            <div className="add mr-2">
              <Icon name="Add"></Icon>
            </div>
            <Input
              className="input"
              placeholder="可按下回车发送消息"
              size="large"
              onPressEnter={onEnter}
              value={inputValue}
              onChange={onInput}
              addBefore={<Icon width="2opx" name="Smile"></Icon>}
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

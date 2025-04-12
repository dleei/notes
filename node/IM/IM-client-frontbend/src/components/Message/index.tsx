import { FC } from "react";

import { MessageWrapper } from "./style";
// 假设类型定义文件在当前项目的 src/types/message.ts 中
import type { IMessage } from "../../types/message";
import { Avatar } from "@arco-design/web-react";

const Message: FC<IMessage> = (props) => {
  const { type, content, time } = props;
  // debugger
  const messageBoxClassName = `msg-box ${type}`;

  return (
    <MessageWrapper>
      <div className="content">
        {type !== 'self' ? (
          <Avatar>
            <img
              alt="avatar"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </Avatar>
        ) : null}
        <div className={messageBoxClassName}>
          <div className="message">{content}</div>
          <div className="time">{time}</div>
        </div>

        {type === 'self' ? (
          <Avatar>
            <img
              alt="avatar"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </Avatar>
        ) : null}
      </div>
    </MessageWrapper>
  );
};

export default Message;

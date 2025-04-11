import styled from "styled-components";

const MessageWrapper = styled.div`
  .content {
    padding: 10px 20px;
    /* width: 95%; */
    display: flex;
    align-items: center;
   
  }

  .msg-box {
    position: relative;
   
    padding: 10px;
    margin-left: 10px;

    &.self {
      align-self: flex-end;
      background: #1890ff;
      border-radius: 10px 10px 0 10px;
      margin-left: auto;
      margin-right: 10px;
    }

    &.other {
      align-self: flex-start;
      background: #c1c1c1;
      border-radius: 10px 10px 10px 0;
    }

    .message {
      color: #fff;
      word-break: break-word;
    }

    .time {
      position: absolute;
      bottom: -20px;
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      ${(props: any) => (props.className?.includes("self") ? "right: 0;" : "left: 0;")}
    }
  }
`;

export { MessageWrapper };

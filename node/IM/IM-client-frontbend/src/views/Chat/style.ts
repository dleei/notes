import styled from "styled-components";

const ChatWrapper = styled.div`
  .home {
    display: flex;
    background-color: #f6f6f6;
    min-height: 100vh;

    .list {
      width: 200px;
      padding: 20px;
      background-color: #3152E4;
    }
  }

  .content_chat {
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      
      .empty-background {
       
        width: 100%;
        height: 100%;
        background-image: url("/src/assets/status/暂无消息.png");  
        background-repeat: no-repeat;
        background-position: center;
        background-size: 300px auto;
      }
    }

    .chat {
      box-sizing: border-box;
      padding: 10px 15px;
      height: 70px;
      width: 100%;
      background-color: #fff;
      display: flex;
      align-items: center;
      & > .send {
        width: 120px;
        height: 100%;
      }
      & > .input {
        flex: 1;
        height: 100%;
      }
    }
  }
`;

export default ChatWrapper;

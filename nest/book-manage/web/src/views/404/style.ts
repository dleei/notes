import styled from 'styled-components';

// 定义 NotFoundWrapper 样式
export const NotFoundWrapper = styled.div`
  /* 使整个页面充满背景并有渐变色 */
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(45deg, #00c6ff, #0072ff, #2a69d1);
    background-size: 400% 400%;  /* 背景渐变范围 */
    animation: gradient 15s ease infinite;  /* 渐变动画 */
    color: white;
    font-family: 'Arial', sans-serif;

    .not-found-content {
      text-align: center;
      padding: 40px 50px;
      background-color: rgba(0, 0, 0, 0.6); /* 半透明背景 */
      border-radius: 15px;
      animation: fadeIn 1.5s ease-in-out;  /* 内容区域渐显效果 */

      .error-code {
        font-size: 120px;
        font-weight: bold;
        margin: 0;
        letter-spacing: 5px;
        animation: bounceIn 2s ease;  /* 错误代码的弹跳效果 */
      }

      .error-message {
        font-size: 24px;
        margin-top: 20px;
        animation: fadeIn 2s ease-in-out;
      }

      .back-home {
        display: inline-block;
        margin-top: 30px;
        padding: 12px 25px;
        background-color: #ff4081;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;  /* 按钮变大及颜色变化 */

        &:hover {
          background-color: #ff1779;
          transform: scale(1.1);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  /* 背景渐变动效 */
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* 文字的渐显效果 */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* 错误代码的弹跳效果 */
  @keyframes bounceIn {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
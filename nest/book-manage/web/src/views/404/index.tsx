import { NotFoundWrapper } from "./style";

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <div>
        <h1>404</h1>
        <p>Oops! 页面未找到</p>
        <a href="/">返回首页</a>
      </div>
    </NotFoundWrapper>
  );
};

export default NotFound;

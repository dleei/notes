import { NotFoundWrapper } from "./style";

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <p className="error-message">Oops! 页面未找到</p>
          <a href="/" className="back-home">
            返回首页
          </a>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default NotFound;

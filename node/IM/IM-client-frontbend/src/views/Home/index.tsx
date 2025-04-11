import { FC } from "react";
import { HomeWrapper } from "./style";
import TabBar from "../../components/TabBar";
import { Outlet } from "react-router-dom";

const Chat: FC = () => {
  return (
    <HomeWrapper>
      <div className="home m-center common-with">
        {/* 左侧竖向导航栏 */}
        <TabBar></TabBar>

        {/* 在线人数，右侧聊天内容区域 */}
        <div className="w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </HomeWrapper>
  );
};

export default Chat;

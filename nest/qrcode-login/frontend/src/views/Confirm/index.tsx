import { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Button, message } from "antd";

import ConfirmWrapper from "./style";
import { codeUpdate, confirmLogin, cancelLogin as cancelLoginApi, login } from "@/apis";

interface IProps {
  children?: ReactNode;
}

const params = new URLSearchParams(window.location.search.slice(1));

const uid = params.get("uid");

const Confirm: FC<IProps> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    // 初始进入确认界面说明已经完成扫码
    updateCodeStatus();
  }, []);

  const toLogin = async () => {
    const params = {
      username: "admin",
      password: 123456,
    };

    const {
      data: { token },
    } = await login(params);
    // debugger;
    localStorage.setItem("user-token", token);

    navigate("/result");

    confirmLogin(uid);

    messageApi.open({
      content: "登录成功",
      type: "success",
      duration: 1,
    });
  };

  const cancelLogin = () => {
    cancelLoginApi(uid);
    messageApi.open({
      content: "登录已取消",
      type: "error",
      duration: 1,
    });
  };

  const updateCodeStatus = () => codeUpdate(uid);

  return (
    <ConfirmWrapper>
      <div className="flex flex-col justify-end h-screen">
        {contextHolder}
        <div className="flex-1 flex-center text-2xl text-[#1E80FF]">
          确认登录***网站吗？
        </div>
        <div className="px-3">
          <Button type="primary" block onClick={toLogin}>
            确认登录
          </Button>
          <Button block onClick={cancelLogin} className="my-4">
            取消
          </Button>
        </div>
      </div>
    </ConfirmWrapper>
  );
};

export default memo(Confirm);

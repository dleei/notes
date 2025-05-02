import { FC, useState } from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";

import RegisterWrapper from "./style";
import Icon from "@/components/Icon";
import rules from "@/config";
import type { Register } from "@/types";
import { register } from "@/apis";
import { ResponseStatus } from "@/enum";

const Register: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 18, offset: 6 },
    },
  };

  const toRegister = async (value: Register) => {
    try {
      setLoading(true);
      const { code } = await register(value);

      if (code !== ResponseStatus.SUCCESS) {
        message.error("注册失败，请稍后重试");
        return;
      }

      message.success("注册成功，请登录");
      navigate("/login");
    } catch (error) {
      message.error("注册请求失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterWrapper className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
      <div className="w-[420px] bg-white px-8 py-6 rounded-lg shadow-lg">
        <h1 className="text-center mb-6 text-2xl font-bold">图书管理系统</h1>
        <Form {...formItemLayout} className="max-w-md mx-auto" onFinish={toRegister}>
          <Form.Item label="用户名" name="username" rules={rules.userRules.name}>
            <Input prefix={<Icon name="user" />} />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={rules.userRules.password}>
            <Input.Password prefix={<Icon name="password" />} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <div className="flex justify-between items-center">
              <Checkbox>记住密码</Checkbox>
              <a href="/login" className="text-blue-600 hover:underline">
                已有账号？去登录
              </a>
            </div>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button loading={loading} block type="primary" htmlType="submit" size="large">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RegisterWrapper>
  );
};

export default Register;

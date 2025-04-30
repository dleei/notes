import { FC } from "react";
import { Button, Form, Input, Checkbox } from "antd";

import Icon from "@/components/Icon";
import rules from "@/config";

import LoginWrapper from "./style";

const Login: FC = () => {
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

  return (
    <LoginWrapper className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
      <div className="w-[420px] bg-white px-8 py-6 rounded-lg shadow-lg">
        <h1 className="text-center mb-6 text-2xl font-bold">图书管理系统</h1>
        <Form {...formItemLayout} className="max-w-md mx-auto">
          {/* 用户名 */}
          <Form.Item label="用户名" name="username" rules={rules.userRules.name}>
            <Input prefix={<Icon name="user" />} />
          </Form.Item>

          {/* 密码 */}
          <Form.Item label="密码" name="password" rules={rules.userRules.password}>
            <Input.Password prefix={<Icon name="password" />} />
          </Form.Item>

          {/* 操作区域 */}
          <Form.Item {...tailFormItemLayout}>
            <div className="flex justify-between items-center">
              <Checkbox>记住密码</Checkbox>
              <a href="/register" className="text-blue-600 hover:underline">
                没有账号？去注册
              </a>
            </div>
          </Form.Item>

          {/* 注册按钮 */}
          <Form.Item {...tailFormItemLayout}>
            <Button block type="primary" htmlType="submit" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  );
};

export default Login;

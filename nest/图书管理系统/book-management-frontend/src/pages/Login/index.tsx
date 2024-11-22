import { Button, Form, Input, message } from 'antd'
import type { LoginUser } from '../../types/user'
import { toLogin } from '../../apis/user'
import './index.css'

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}

const onFinish = async (val: LoginUser) => {
  const { status } = await toLogin(val)

  if (status === 200 || status === 201) {
    message.success('登录成功')
    window.location.href = '/'
  }
}

export function Login() {
  return (
    <div className='login-container'>
      <h1>图书管理系统</h1>
      <Form
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete='off'>
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className='links'>
            <a href='/register'>没有账号？去注册</a>
          </div>
        </Form.Item>

        <Form.Item {...layout2}>
          <Button
            className='btn'
            type='primary'
            htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

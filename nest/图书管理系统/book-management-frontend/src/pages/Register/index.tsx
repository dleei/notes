import { Button, Form, Input, message } from 'antd'
import type { RegisterUser } from '../../types/user'
import { toRegister } from '../../apis/user'
import './index.css'

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}



const  onFinish = async (val: RegisterUser) => {
  if (val.password !== val.confirmPassword) {
    message.error('两次密码不一致')
    return
  }
  const {  status } = await toRegister(val)
  if(status === 200 || status === 201) {
    message.success('注册成功')
    
    // 跳转到登录页
    window.location.href = '/login'
  }
}
export function Register() {
  return (
    <div className='register-container'>
      <h1>图书管理系统</h1>
      <Form
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete='off'>
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='确认密码'
          name='confirmPassword'
          rules={[{ required: true, message: '请确认密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...layout2}>
          <div className='links'>
            <a href='/login'>已有账号？去登录</a>
          </div>
        </Form.Item>
        <Form.Item {...layout2}>
          <Button
            className='btn'
            type='primary'
            htmlType='submit'>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

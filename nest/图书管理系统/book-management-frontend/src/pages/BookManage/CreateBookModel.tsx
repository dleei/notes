import { Form, Input, Modal, message, TextArea } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Area from 'antd/es/input/TextArea'
import type { CreateBook } from '../../types/books'
import { createBook } from '../../apis/book'
import { CoverUpload } from './CoverUpload'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

interface CreateBookModalProps {
  isOpen: boolean
  handleClose: Function
}

export function CreateBookModel(props: CreateBookModalProps) {
  const [form] = useForm<CreateBook>()

  const handleOK = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()
    
    const { status } = await createBook(values)

    if (status === 'Success') {
      message.success('创建成功')
      props.handleClose()
      form.resetFields()
    }
  }

  return (
    <Modal
      title='新增图书'
      open={props.isOpen}
      onOk={handleOK}
      onCancel={() => props.handleClose()}
      okText={'创建'}
      cancelText={'关闭'}>
      <Form
        form={form}
        colon={false}
        {...layout}>
        <Form.Item
          label='图书名称'
          name='name'
          rules={[{ required: true, message: '请输入图书名称!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='作者'
          name='author'
          rules={[{ required: true, message: '请输入图书作者!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='描述'
          name='description'
          rules={[{ required: true, message: '请输入图书描述!' }]}>
          <Area />
        </Form.Item>
        <Form.Item
          label='封面'
          name='cover'
          rules={[{ required: true, message: '请上传图书封面!' }]}>
          <CoverUpload />
        </Form.Item>
      </Form>
    </Modal>
  )
}

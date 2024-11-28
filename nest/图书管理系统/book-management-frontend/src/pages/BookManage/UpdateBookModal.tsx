import { Button, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { CoverUpload } from './CoverUpload'
import type { UpdateBook } from '../../types/books'
import { bookDetail, updateBooks } from '../../apis/book'
import { useEffect } from 'react'

interface UpdateBookModalProps {
  id: number
  isOpen: boolean
  handleClose: Function
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export function UpdateBookModal(props: UpdateBookModalProps) {
  const [form] = useForm<UpdateBook>()

  const updateBook = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()

    const res = await updateBooks({ ...values, id: props.id })
    console.log(res)
  }

  // 获取图书详情
  const getBookDetail = async () => {
    if (!props.id) return

    const { data, status } = await bookDetail(props.id)
    if (status === 200 || status === 201) {
      form.setFieldValue('id', data.id)
      form.setFieldValue('name', data.name)
      form.setFieldValue('author', data.author)
      form.setFieldValue('description', data.description)
      form.setFieldValue('cover', data.cover)
    }
  }

  useEffect(() => {
    getBookDetail()
  }, [props.id])

  return (
    <Modal
      title='更新图书'
      open={props.isOpen}
      onOk={updateBook}
      onCancel={() => props.handleClose()}
      okText={'更新'}
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
          <TextArea />
        </Form.Item>
        <Form.Item
          label='封面'
          name='cover'
          rules={[{ required: true, message: '请上传图书封面!' }]}>
          <CoverUpload></CoverUpload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

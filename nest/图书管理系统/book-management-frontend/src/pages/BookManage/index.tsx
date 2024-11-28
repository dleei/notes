import { Button, Card, Form, Input, Popconfirm, message } from 'antd'
import type { Book } from '../../types/books'
import { useEffect, useState } from 'react'
import { getBookList, delBook } from '../../apis/book'
import { CreateBookModel } from './CreateBookModel'
import './index.css'
import { UpdateBookModal } from './UpdateBookModal'

const baseUrl: string =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BASE_URL_DEV
    : import.meta.env.VITE_BASE_URL_PROD

export function BookManage() {
  const [books, setBooks] = useState<Array<Book>>([])

  const [updateId, setUpdateId] = useState(0)
  const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [isCreateBookModalOpen, setCreateBookModalOpen] = useState(false)

  const [num, setNum] = useState(0)
  // 获取图书列表
  const fetchBookList = async () => {
    const data = await getBookList(name)

    setBooks(data)
  }
  // 图书搜索
  const handleSearch = async (val: { name: string }) => {
    await setName(val.name)
  }
  // 创建图书model关闭
  const handleModelClose = () => {
    setCreateBookModalOpen(false)
    setName('')
    setNum(Math.random())
  }
  // 更新图书model关闭
  const handleUpdateBookModalClose = () => {
    setUpdateBookModalOpen(false)
    setName('')
    setNum(Math.random())
  }
  // 编辑图书
  const editBook = (id: number) => {
    setUpdateId(id)
    setUpdateBookModalOpen(true)
  }

  // 图书详情
  const getBookDetail = async (id: number) => {
    setUpdateId(id)
    setUpdateBookModalOpen(true)
  }

  // 删除图书
  const handleDelete = async (id: number) => {
    const { status } = await delBook(id)
    if (status === 200 || status === 201) {
      message.success('删除成功')

      setNum(Math.random())
    }
    //  console.log(res)
  }

  useEffect(() => {
    fetchBookList()
  }, [name, num])

  return (
    <div className='bookManage'>
      <CreateBookModel
        isOpen={isCreateBookModalOpen}
        handleClose={handleModelClose}
      />
      <UpdateBookModal
        id={updateId}
        isOpen={isUpdateBookModalOpen}
        handleClose={handleUpdateBookModalClose}
      />
      <h1>图书管理系统</h1>
      <div className='content'>
        <div className='book-search'>
          <Form
            name='search'
            layout='inline'
            onFinish={handleSearch}
            colon={false}>
            <Form.Item
              label='图书名称'
              name='name'>
              <Input />
            </Form.Item>
            <Form.Item label=' '>
              <Button
                className='search-btn'
                type='primary'
                htmlType='submit'>
                搜索图书
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                style={{ background: 'green' }}
                onClick={() => {
                  setCreateBookModalOpen(true)
                }}>
                添加图书
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='book-list'>
          {books.map(book => {
            return (
              <Card
                key={book.id}
                className='card'
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt='example'
                    src={baseUrl + book.cover}
                  />
                }>
                <h2>{book.name}</h2>
                <div>{book.author}</div>
                <div className='links'>
                  <a
                    href='#'
                    onClick={() => {
                      getBookDetail(book.id)
                    }}>
                    详情
                  </a>
                  <a
                    href='#'
                    onClick={() => {
                      editBook(book.id)
                    }}>
                    编辑
                  </a>
                  <Popconfirm
                    title='删除图书'
                    description='确定删除该图书吗？'
                    onConfirm={() => handleDelete(book.id)}
                    okText='确定'
                    cancelText='取消'>
                    <a href='#'>删除</a>
                  </Popconfirm>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

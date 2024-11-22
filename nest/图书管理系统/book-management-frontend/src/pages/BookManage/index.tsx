import { Button, Card, Form, Input } from 'antd'
import type { Book } from '../../types/books'
import { useEffect, useState } from 'react'
import { getBookList } from '../../apis/book'
import './index.css'

const baseUrl: string =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BASE_URL_DEV
    : import.meta.env.VITE_BASE_URL_PROD

export function BookManage() {
  const [books, setBooks] = useState<Array<Book>>([])

  const [name, setName] = useState('')

  const fetchBookList = async () => {
    // const { data, status } = await getBookList(name)
    const res = await getBookList(name) 
    console.log(res)

    /*    if (status === 200 || status === 201) {
      setBooks(data)
    } */
  }

  const handleSearch = async (val: { name: string }) => {
   await setName(val.name)
  }

  useEffect(() => {
    fetchBookList()
  }, [name])

  return (
    <div className='bookManage'>
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
                style={{ background: 'green' }}>
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
                  <a href='#'>详情</a>
                  <a href='#'>编辑</a>
                  <a href='#'>删除</a>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import request from '../utils/request'
import type { CreateBook, UpdateBook } from '../types/books'
/**
 *
 * @param name 书籍名称
 * @description 获取书籍列表
 * @returns  {Array<Book>} 书籍列表
 */
export const getBookList = (name: string) => {
  return request.get('/book/list', { params: { name } })
}

/**
 *
 * @param book 书籍信息
 * @description 新增书籍
 * @returns {Array<Book>} 书籍列表
 */
export const createBook = (book: CreateBook) => {
  return request.post('/book/create', {
    name: book.name,
    author: book.author,
    description: book.description,
    cover: book.cover,
  })
}

/**
 *
 * @param id 书籍id
 * @description 删除书籍
 * @returns
 */
export const delBook = (id: number) => {
  return request.delete(`/book/delete/${id}`)
}

/**
 *
 * @param id 书籍id
 * @param book {CreateBook} 书籍信息
 * @description 更新书籍
 * @returns
 */
export const updateBooks = ( book: UpdateBook) => {
  return request.put(`/book/update`, {
    id: book.id,
    name: book.name,
    author: book.author,
    description: book.description,
    cover: book.cover,
  })
}

/**
 *
 * @param id 书籍id
 * @description 获取书籍详情
 * @returns {Book} 书籍详情
 */
export const bookDetail = (id: number) => {
  return request.get(`/book/detail/${id}`)
}

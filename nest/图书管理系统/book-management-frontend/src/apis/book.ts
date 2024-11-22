import request from '../utils/request'

export const getBookList = (params:string) => {
  request.get('/book/list', { params })
}
import request from "@/utils/modules/request";
import type { Book } from "@/types";

/**
 * 获取书籍列表
 */

export const getBookList = () => request.get("/book/list");

/**
 * 获取书籍详情
 * @param {number} id
 */
export const getBookDetail = (id: number) => request.get(`/book/${id}`);

/**
 * 编辑图书
 * @param {object} data
 */

export const editBook = (data: Book) => request.put("/book/update", data);

/**
 * 删除图书
 * @param {number} id
 */

export const deleteBook = (id: number) => request.delete(`/book/delete/${id}`);

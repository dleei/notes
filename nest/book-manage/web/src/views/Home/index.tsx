import { FC, useState, useEffect } from "react";
import { Button, Input } from "antd";

import { HomeWrapper } from "./style";
import Card from "@/components/Card";
import type { Book } from "@/types";
import { getBookList } from "@/apis";

const Home: FC = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  
  const handleDeleted = (deletedId: number) => {
    setBookList(prev => prev.filter(book => book.id !== deletedId));
  };
  
  const handleUpdated = (updatedBook: Book) => {
    setBookList(prev => 
      prev.map(book => book.id === updatedBook.id ? updatedBook : book)
    );
  };

  useEffect(() => {
    getBookList().then((res) => setBookList(res));
  }, []);

  return (
    <HomeWrapper>
      <div className="min-h-screen px-3">
        <div className="text-[25px] font-bold color-[#1677FF] mb-6">图书管理系统</div>
        {/* 筛选区域 */}
        <div className="flex">
          <Input className="w-[160px]" />
          <div className="flex-1">
            <Button type="primary" className="ml-2">
              搜索
            </Button>
            <Button type="dashed" className="ml-2">
              新增
            </Button>
          </div>
        </div>
        {/* 图书卡片区域 */}
        <div className="flex flex-wrap">
          {bookList.map((book) => (
            <div key={book.id} className="w-[200px] my-4 mr-4">
              <Card book={book} onDeleted={handleDeleted} onUpdated={handleUpdated} />
            </div>
          ))}
        </div>
      </div>
    </HomeWrapper>
  );
};

export default Home;

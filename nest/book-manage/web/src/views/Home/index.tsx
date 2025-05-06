import { FC, useState, useEffect } from "react";
import { Button, Input, message } from "antd";

import { HomeWrapper } from "./style";
import Card from "@/components/Card";
import type { Book } from "@/types";
import { getBookList, searchBook } from "@/apis";

const Home: FC = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");

  // 删除书籍
  const handleDeleted = (deletedId: number) => {
    setBookList((prev) => prev.filter((book) => book.id !== deletedId));
  };

  // 更新书籍
  const handleUpdated = (updatedBook: Book) => {
    setBookList((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  // 搜索处理函数
  const handleSearch = () => {
    const keyword = searchText.trim();

    // 空搜索时获取全部书籍
    if (!keyword) {
      getBookList().then((res) => {
        setBookList(res);
        message.success("已显示全部书籍");
      });

      return;
    }

    // 执行搜索请求
    searchBook(keyword).then((res) => {
      // debugger;
      setBookList(res);
    });
  };

  // 初始化加载数据
  useEffect(() => {
    getBookList().then((res) => {
      setBookList(res);
    });
  }, []);

  return (
    <HomeWrapper>
      <div className="min-h-screen px-3">
        <div className="text-[25px] font-bold color-[#1677FF] mb-6">图书管理系统</div>

        {/* 搜索和操作区域 */}
        <div className="flex items-center gap-2 mb-4">
          <Input
            className="w-[200px]"
            placeholder="输入书名或作者"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>

          <Button type="dashed" className="ml-2">
            新增图书
          </Button>
        </div>

        <div className="flex flex-wrap">
          {bookList.map((book) => {
            return (
              <div key={book.id} className="w-[200px] my-4 mr-4">
                <Card book={book} onDeleted={handleDeleted} onUpdated={handleUpdated} />
              </div>
            );
          })}
        </div>

        {/* 空状态提示 */}
        {bookList.length === 0 && (
          <div className="text-center py-8 text-gray-500">暂无书籍数据</div>
        )}
      </div>
    </HomeWrapper>
  );
};

export default Home;

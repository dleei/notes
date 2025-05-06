import { memo, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import {
  Card as AntdCard,
  Image,
  Modal,
  Popconfirm,
  Form,
  Input,
  message,
  Upload,
} from "antd";

import CardWrapper from "./style";
import type { Book } from "@/types";
import { deleteBook, editBook } from "@/apis";

interface IProps {
  children?: ReactNode;
  book: Book;
  className?: string;
  onDeleted?: (id: number) => void;
  onUpdated?: (book: Book) => void;
}

interface IDetailOrEdit {
  visible: boolean;
  mode: "detail" | "edit";
  loading: boolean;
}

const Card: FC<IProps> = ({ book, onDeleted, onUpdated }) => {
  const { name, author, cover, publisher, id, description } = book;
  const [form] = Form.useForm();

  const [modalState, setModalState] = useState<IDetailOrEdit>({
    visible: false,
    mode: "detail",
    loading: false,
  });

  // 初始化表单值
  useEffect(() => {
    if (modalState.visible) {
      form.setFieldsValue({
        name,
        author,
        publisher,
      });
    }
  }, [modalState.visible]);

  // 统一处理弹窗操作
  const handleModalAction = async (mode: "detail" | "edit", id: number) => {
    setModalState((prev) => ({
      ...prev,
      id,
      visible: true,
      mode,
    }));
  };

  // 删除确认
  const handleDelete = async () => {
    await deleteBook(id);
    message.success("删除成功");
    onDeleted?.(id);
  };

  // 提交表单
  const handleSubmit = async () => {
    setModalState((prev) => ({ ...prev, loading: true }));

    if (modalState.mode === "edit") {
      const values = await form.validateFields();

      const updatedBook = await editBook({ ...values, id });

      onUpdated?.(updatedBook);
      message.success("更新成功");
    }

    setModalState({ visible: false, mode: "detail", loading: false });
  };

  return (
    <>
      <Modal
        title={modalState.mode === "detail" ? "书籍详情" : "编辑书籍"}
        open={modalState.visible}
        onCancel={() => setModalState((prev) => ({ ...prev, visible: false }))}
        onOk={handleSubmit}
        confirmLoading={modalState.loading}
        okText="保存"
        cancelText={modalState.mode === "detail" ? "关闭" : "取消"}
      >
        <div className="flex gap-4">
          <Image
            src={cover}
            alt={name}
            width={120}
            preview={false}
            className="rounded-lg"
          />

          <Form form={form} className="flex-1">
            <Form.Item label="名称" name="name">
              {modalState.mode === "detail" ? (
                <div>{name}</div>
              ) : (
                <Input placeholder="请输入书名" />
              )}
            </Form.Item>

            <Form.Item label="作者" name="author">
              {modalState.mode === "detail" ? (
                <div>{author}</div>
              ) : (
                <Input placeholder="请输入作者" />
              )}
            </Form.Item>

            <Form.Item label="出版社" name="publisher">
              {modalState.mode === "detail" ? (
                <div>{publisher}</div>
              ) : (
                <Input placeholder="请输入出版社" />
              )}
            </Form.Item>

            {modalState.mode === "detail" && (
              <Form.Item label="简介" name="description">
                <div>{description}</div>
              </Form.Item>
            )}

            {modalState.mode === "edit" && (
              <Form.Item label="封面" name="cover">
                <Upload listType="picture-card">
                  <div className="ant-upload-text">点击上传</div>
                </Upload>
              </Form.Item>
            )}
          </Form>
        </div>
      </Modal>

      <CardWrapper>
        <AntdCard hoverable cover={<Image src={cover} alt={name} preview={false} />}>
          <div className="text-[16px] font-bold pb-1">{name}</div>
          <div className="text-[14px] text-[#999] ellipsis pb-1">{author}</div>
          <div className="text-[14px] text-[#999] pb-1">{publisher}</div>

          <div className="flex justify-around mt-2">
            <div
              className="cursor-pointer text-blue-600"
              onClick={() => handleModalAction("detail", id)}
            >
              详情
            </div>

            <div
              className="cursor-pointer text-blue-600"
              onClick={() => handleModalAction("edit", id)}
            >
              编辑
            </div>

            <Popconfirm
              title="确定要删除吗？"
              onConfirm={handleDelete}
              okText="确定"
              cancelText="取消"
            >
              <div className="cursor-pointer text-blue-600">删除</div>
            </Popconfirm>
          </div>
        </AntdCard>
      </CardWrapper>
    </>
  );
};

export default memo(Card);

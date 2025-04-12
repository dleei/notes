export interface IMessage {
  type?: "self" | "other" | string; // 允许任意字符串类型
  time?: string | number;
  content: string;
}

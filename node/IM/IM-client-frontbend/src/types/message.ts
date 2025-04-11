export interface IMessage {
  info: {
    type?: "self" | "other" | string; // 允许任意字符串类型
    time?: string | number;
    msg: string;
  }
}

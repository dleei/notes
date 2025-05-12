import { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

import ResultWrapper from "./style";
import { getUserInfo } from "@/apis";

const Result: FC<IProps> = () => {
  const [info, setInfo] = useState<any>();

  useEffect(() => {
    getUserInfo().then((res) => {
      const {
        data: { username },
      } = res;

      setInfo(username);
    });
  });

  return (
    <ResultWrapper>
      欢迎回来<br></br>当前用户为：
      <span className="font-900 text-[25px] color-red">{info}</span>
    </ResultWrapper>
  );
};

export default memo(Result);

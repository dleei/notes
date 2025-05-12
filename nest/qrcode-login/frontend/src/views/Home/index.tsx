import { FC, useEffect, useState } from "react";

import { HomeWrapper } from "./style";
import { getCodeImg, codeCheck } from "@/apis";
import { CodeStatus } from "@/enum";

const Home: FC = () => {
  const [codeImg, setCodeImg] = useState<string>("");
  const [codeState, setCodeState] = useState<string>("未扫码");

  // 使用轮询获取二维码状态
  const queryStatus = async (qrcode: number) => {
    if (!qrcode) return;
    const { result } = await codeCheck(qrcode);

    switch (result.status) {
      case "expired":
        setCodeState(CodeStatus.expired);
        break;
      case "confirmed":
        setCodeState(CodeStatus.confirmed);
        break;
      case "wait-confirm":
        setCodeState(CodeStatus["wait-confirm"]);
        break;
      case "cancel":
        setCodeState(CodeStatus.cancel);
        break;
      case "no-scan":
        setCodeState(CodeStatus["no-scan"]);
        break;
    }
  };

  const initCodeImg = async () => {
    const { code_url, qrcode_id } = await getCodeImg();

    setCodeImg(code_url);

    const timer = setInterval(() => {
      queryStatus(qrcode_id);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  };

  useEffect(() => {
    initCodeImg();
  }, []);
  return (
    <HomeWrapper>
      <div className="home">
        <img src={codeImg} alt="" />
        <p>{codeState}</p>
      </div>
    </HomeWrapper>
  );
};

export default Home;

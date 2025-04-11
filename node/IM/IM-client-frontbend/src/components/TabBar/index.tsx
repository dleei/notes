import { FC } from "react";
import TabBarWrapper from "./style";
import { tabList } from "../../data/index.json";
import { useNavigate } from "react-router-dom";

import type { ITabList } from "../../types/tabbar";
import Icon from "../Icon";

const TabBar: FC<ITabList> = () => {
  const navigate = useNavigate();

  return (
    <TabBarWrapper>
      <div className="tab">
        {tabList.map((item) => {
          return (
            <div key={item.name} className="item" onClick={() => navigate(item.path)}>
              <Icon name={item.name}></Icon>
              <span className="ml-2">{item.title}</span>
            </div>
          );
        })}
      </div>
    </TabBarWrapper>
  );
};

export default TabBar;

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
      <div className="flex flex-col justify-between px-3 h-full">
        <div className="tab flex-1">
          {tabList.map((item) => {
            return (
              <div key={item.name}>
                <div key={item.name} className="item" onClick={() => navigate(item.path)}>
                  <Icon name={item.name}></Icon>
                  <span className="ml-2">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-2">
          <Icon name="Avatar" />
        </div>
      </div>
    </TabBarWrapper>
  );
};

export default TabBar;

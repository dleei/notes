import styled from "styled-components";

const TabBarWrapper = styled.div`
  .tab {
    width: 100px;

    a {
      text-decoration: none;
    }

    .item {
      display: flex;
      font-size: 12px;
      padding: 10px;
      align-items: center;
      position: relative;
      margin: 3px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        background-color: #b6d1fa;
        color: #fff;
      }
    }
  }
`;

export default TabBarWrapper;

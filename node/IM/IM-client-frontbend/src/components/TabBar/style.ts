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
      align-items: center;
      position: relative;
      padding: 5px 8px;
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

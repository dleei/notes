import styled from 'styled-components';

// 定义 SVG 样式
export const IconWrapper = styled.svg`
  
  aria-hidden: true;
  width: ${({ size }) => size || '1.5rem'};
  height: ${({ size }) => size || '1.5rem'};
  fill: ${({ color }) => color || 'currentColor'};

  &.rotate {
    animation: rotate 1s linear infinite;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
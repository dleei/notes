import React from 'react';
import { IconWrapper } from './style';

interface IconProps {
  name: string;
  rotate?: boolean;
  size?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, rotate = false, size = '1.5rem', color = 'currentColor' }) => {
  return (
    <IconWrapper
      className={`icon ${rotate ? 'rotate' : ''}`}
      size={size}
      color={color}
    >
      <use xlinkHref={`#icon-${name}`} />
    </IconWrapper>
  );
};

export default Icon;

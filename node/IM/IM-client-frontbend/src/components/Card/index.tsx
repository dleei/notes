import { FC } from 'react';
import CardWrapper from './style';

import type { ICard } from '../../types/card';

const Card: FC<ICard> = () => {
    return (
   <CardWrapper>
   <div className="card"></div>
   </CardWrapper>
    )

}
export default Card;

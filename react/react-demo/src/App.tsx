import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>数据更新</h1>
      <MyButton onClick={ handleClick } count={ count }/>
      <br/>
      <MyButton onClick={ handleClick } count={ count }/>
    </div>
  );
}

function MyButton({ onClick,count}:{ onClick: () => void, count: number }) {

  return (
    <button onClick={ onClick }>
    当前数字为：{ count }
    </button>
  );
}

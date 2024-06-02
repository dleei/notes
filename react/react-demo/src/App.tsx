import { useMemo, useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(1)
  // useMemo 有两个参数，
  // 第一个参数是一个计算函数，返回一个经过计算缓存之后的值
  // 第二个参数是一个依赖数组，当依赖数组中的值发生变化时，才会重新计算缓存值

  const double = useMemo(() => {
    return count * 2
  }, [count])
  return (
    <>
      <button onClick={() => setCount(count + 1)}>double</button>
      <div className='fs20'>{double}</div>
    </>
  )
}

export default App

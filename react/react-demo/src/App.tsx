import { useState, useMemo } from 'react'

const App = () => {
  const [count, setCount] = useState(1)
  /*   这里，useMemo 接收两个参数：
创建函数：这是一个函数，用于计算记忆值。这个函数会在初次渲染时执行，并在其依赖项改变时再次执行。
依赖数组：这是一个数组，其中包含了从外部作用域中获取的所有值，这些值决定了什么时候需要重新计算记忆值。如果这些值自上次渲染以来未发生变化，则 useMemo 将复用上次的记忆值而不是重新计算。 */
  const calculations = useMemo(() => {
    const doubleCount = count * 2
    const tripleCount = count * 3
    return {
      doubleCount,
      tripleCount,
    }
  }, [count])
  const handleClick = () => {
    setCount(count + 1) //
  }

  return (
    <div>
      doubleCount: {calculations.doubleCount}
      <br />
      tripleCount:{calculations.tripleCount}
      <br />
      <button onClick={handleClick}>计算属性</button>
    </div>
  )
}

export default App

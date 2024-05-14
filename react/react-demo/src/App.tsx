// 自定义 hook
import { useState } from 'react'
// 把可复用的逻辑写在一个自定义的 hook 中，最后返回设定的值和方法，可以以数组或是对象的形式返回
const useToggle = () => {
  const [value, setValue] = useState(false)
  const toggle = () => setValue(!value)
  return [value, toggle]
}

const App = () => {
  // 使用自定义 hook
  // 调用 useToggle 返回的值和方法
  const [value, toggle] = useToggle()
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <div>{value && 'Hello World'}</div>
    </div>
  )
}

export default App

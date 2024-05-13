import { createContext, useContext } from 'react'
//  1. 使用 createContext 创建一个上下文对象
//  2. 定义一个 Provider 组件，用于提供数据,在顶层组件使用
//  3. 在需要使用的地方通过 useContext 获取上下文中提供的对象，在需要使用数据的地方使用
const Context = createContext('')

const App = () => {
  const msg = '父组件的数据'
  return (
    <div>
      <Context.Provider value={ msg }>
        父组件
        <Son />
      </Context.Provider>
    </div>
  )
}

const Son = () => {
  return (
    <div>
      子组件
      <Grandson />
    </div>
  )
}

const Grandson = () => {
  return (
    <div>
      孙子组件
      <Lower />
    </div>
  )
}

const Lower = () => {
  const value = useContext(Context)  // 使用 useContext 获取上下文中的数据
  return (
    <div>
      底层组件
      {value}
    </div>
  )
}
export default App

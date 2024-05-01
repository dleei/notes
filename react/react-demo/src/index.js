import { createRoot,createElement } from 'react-dom/client' // react18 的新方法, 创建根节点,替代原来的 createDOM

import App from './App.jsx' // 导入 app 组件,也是入口文件和顶级组件
/**
 * createRoot 接收一个 DOM 元素作为参数,返回一个根节点,在后面继续链式调用 render 方法渲染根组件到获取的 dom 元素* 中
 */
createRoot(document.querySelector('#root')).render(<App />)

createElement('div', {}, 'hello world')


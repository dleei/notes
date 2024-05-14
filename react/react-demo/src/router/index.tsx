import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/home'
import Article from '../pages/article'
// 创建路由实例对象
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // element 表示要渲染的组件 ，就是 vue 中的component
    children: [
      {
        index: true, // index 表示当前路由是默认路由
        element: <Article />,
      }
    ]
  },
  {
    path: '*',
    element: <div>404</div> // 表示 404 页面
  }

])
// 导出路由实例对象
export default router

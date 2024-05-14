import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // 引入路由组件
import  router  from './router' // 引入路由实例

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>   RouterProvider 用来提供路由出口并绑定路由
  </React.StrictMode>
)

import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { BookManage } from './pages/BookManage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

const routes = [
  {
    path: '/',
    element: <BookManage />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

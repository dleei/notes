import { Link , Outlet} from "react-router-dom" // outlet 表示占位符,表示二级路由的渲染位置

const Home = () => {
  return (
    <div>
      <Link to='/article'>article</Link>
      <h1>home</h1>
      <Outlet/>
    </div>
  )
}
export default Home

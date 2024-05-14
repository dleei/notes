import { Link } from 'react-router-dom'
// 使用了useSearchParams钩子来获取URL中的查询参数。useSearchParams返回一个数组，其中第一个元素是SearchParams对象，第二个元素是一个函数，用于更新查询参数
import { useSearchParams } from 'react-router-dom'
const Article = () => {
  const [params] = useSearchParams()
  const id = params.get('id')
  return (
    <div>
      <Link to='/home'>回到首页</Link>
      <h1>article</h1>
      <p>{id}</p>
    </div>
  )
}
export default Article
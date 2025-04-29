import { AppDataSource } from './data-source'
import { User, IdCard } from './entity'

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.name = "张三"
//     user.nickname = 'tom'
//     // user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

// 使用存储库方式
async function main() {
  // await AppDataSource.initialize()

  // const user = new User()

  // user.name = '李子柒'
  // user.nickname = 'july'
  // user.age = 18

  // // 新增
  // const userRepository = AppDataSource.getRepository(User)

  // await userRepository.save(user)

  // // 查询
  // const users = await userRepository.find()
  // // console.log(users)

  // // 查找
  // const findUser = await userRepository.findOneBy({
  //   id: 1,
  // })
  // // console.log(findUser)
  // // 更新
  // const updateUser = await userRepository.findOneBy({
  //   id: 1,
  // })

  // updateUser.name = '刘玥'
  // updateUser.nickname = 'juleliu'

  // await userRepository.save(updateUser)

  // console.log('updateUser', updateUser)

  // // 删除

  // const users1 = await userRepository.findOneBy({ id: 1 })

  // await userRepository.delete(users1)

  // console.log('deleted', users1)

  // // console.log(users1)

  await AppDataSource.initialize()

  const user = new User()

  user.name = '刘玥'
  user.nickname = 'juleliu'
  user.age = 19

  const idCard = new IdCard()

  idCard.name = 'juleliu'
  idCard.address = '上海'
  idCard.createTime = new Date()
  idCard.id = 11
  idCard.age = 19

  // 关联两个实体
  // user.id = user.id

  idCard.user = user

  // 获取实体存储库
  const userRepo = AppDataSource.getRepository(User)
  const idCardRepo = AppDataSource.getRepository(IdCard)

  // 首先保存用户
  await userRepo.save(user)
  // 然后保存身份证
  await idCardRepo.save(idCard)

  // 双向加载关联 idCard

  await userRepo.find({ relations: { idCard: true } })
}

main()

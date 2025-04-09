// 导入 nestjs 的NestFactory模块，用于创建 Nest 应用程序的实例
import { NestFactory } from '@nestjs/core'
// 导入 AppModule，这是应用程序的根模块，包含了应用程序的所有组件和模块
import { AppModule } from './app.module'

// 定义一个异步函数 bootstrap，用于创建nest实例并启动应用程序
async function bootstrap() {
  // 使用NestFactory的静态方法 create 创建 Nest 应用程序的实例，传入 AppModule 作为根模块
  const app = await NestFactory.create(AppModule) 

  // 调用 app 的 listen 方法，监听指定端口（3000），并在控制台输出应用程序已启动的消息
  await app.listen(3000)
  //  console.log('应用程序已启动')
}

// 调用 bootstrap 函数，启动应用程序
bootstrap()

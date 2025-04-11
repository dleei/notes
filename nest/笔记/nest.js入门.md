## 初识nest

### 什么是nest.js?

Nest (NestJS) 是一个用于构建高效、可扩展的 [Node.js](https://nodejs.cn/) 服务器端应用的框架。它使用渐进式 JavaScript，构建并完全支持 [TypeScript](http://ts.nodejs.cn/)（但仍然允许开发者使用纯 JavaScript 进行编码）并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素

### 安装

使用nest核心包建一个简易的nest项目

```bash
npm -g ts-node
npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata @nestjs/platform-express
```

### nest核心包

`@nestjs/coreNest.js`核心模块，提供构建、启动和管理Nest.js应用程序的基础设施
`@nestjs/common`包含了构建Nest.js应用程序基础设施和常用装饰器，像控制器、服务、中间件、守卫、拦截器、管道、异常过滤器等
`rxjs`用于构建异步和事件驱动程序的库。
`reflect-metadata`实现元编程的库，提供元数据反射API，可以在运行时检查和操作对象的元数据
`@nestjs/platform-expressNest的Express`平台适配器，提供中间件、路由等功能

### 运行 nest项目

```ts
// src/main.ts
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

```



```ts
// src/app.module.ts
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AppController],
})
export class AppModule {
    constructor() { }
}

/**
 * 1. @Module 装饰器：用于定义一个模块，接受一个对象作为参数，其中包含了模块的元数据。
 *  模块是组织代码的基本单元，它包含了一组相关的组件、服务和提供者组织在一起。
 *  Nest 模块是受 Angular 模块的启发
 */
```



```ts
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() { }
    
    @Get()
    // 定义一个异步方法 getHello，返回一个字符串 "Hello World!"，用于测试应用程序是否正常运行
    async getHello():Promise<string> {
        return "Hello World!";
    }
} 

/**
 * 
 * @ Controller 装饰器：用于定义一个控制器类，接受一个字符串作为参数，用于指定控制器的路由路径。控制器类是处理 HTTP 请求的类，它包含了一组处理 HTTP 请求的方法。
 * 在控制器内部会使用 路由装饰器 如 @Get、@Post、@Put、@Delete 等来定义处理不同 HTTP 请求的方法。
 * 
 * @ Get 装饰器：用于将控制器的方法（getHello)映射到本地的 http 的 get 请求。
 */
```



```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext", // 指定编译版本，使用 ECMAScript
    "module": "CommonJS", // 指定模块系统，使用 CommonJS
    "moduleResolution": "Node", // 如何查找第三方模块，使用 Node.js 风格的模块解析
    "outDir": "./dist", // 编译后的文件输出目录
    "experimentalDecorators": true, // 启用实验性的装饰器支持
    "emitDecoratorMetadata": true, // 启用实验性的装饰器元数据生成
  }
}
```

在package.json 里面添加一条命令

```json
  "scripts": {
    "dev": "ts-node src/main.ts"
  }

```

运行服务，这样一个简单的nest服务器就启动起来了

![](D:\Download\notes\nest\笔记\assets\运行nestjs.png)

访问一下，可以看到成功返回数据

<img src="D:\Download\notes\nest\笔记\assets\访问服务.png" style="zoom:67%;" />

## Nest CLI

前提条件

> 请确保你的操作系统上安装了 [Node.js](https://nodejs.cn/)（版本 >= 20）

### 安装

```bash
npm i @Nestjs/cli -g
```

使用`nest -v` 查看是否安装成功

![](D:\Download\notes\nest\笔记\assets\nest -v.png)

使用nest -h 查看所有命令

<img src="D:\Download\notes\nest\笔记\assets\nest -h.png" style="zoom: 50%;" />

nest 提供了丰富的命令

- nest new（n） 创建项目
- nest build 构建生产环境代码
- nest start 启动本地服务
- nest add 添加第三方插件或是模块
- nest generate（g） 用于生成各种模块代码
- nest info（i）查看当前项目中的 Nest 包信息

···

### nest new

<img src="D:\Download\notes\nest\笔记\assets\nest new -h.png" style="zoom:70%;" />

`-g` `-s` 很容易理解跳过git初始化，跳过 npm install

`-p` 选择npm包管理器

`-l` 指定使用js 还是 ts 一般使用默认的 ts 即可

`—-strict` 是否使用 ts 的严格模式

```bash
nest new demo
```

<img src="D:\Download\notes\nest\笔记\assets\nest new demo.png" style="zoom:67%;" />

### nest generate

<img src="D:\Download\notes\nest\笔记\assets\nest g -h.png" style="zoom:67%;" />

nest 命令除了可以生成整个项目外，还可以生成一些别的代码，比如 controller、service、module 等

```bash
nest generate module user
```

他会生成module代码

<img src="D:\Download\notes\nest\笔记\assets\nest g user.png" style="zoom:67%;" />

还会自动在 app.module.ts 里面自动引入

![](D:\Download\notes\nest\笔记\assets\user自动引入.png)

当然你也可以生成 controller 或是 sevice 等代码，同样它也是会自动在 module 里面引入

当然我们在模块化开发时肯定是不会一个一个自己手动去生成，使用比如`nest g res product`

一键生成代码模板，我们可以使用命令行选择使用哪种代码风格

![](D:\Download\notes\nest\笔记\assets\nest g res product.png)

<img src="D:\Download\notes\nest\笔记\assets\product模块生成.png" style="zoom:67%;" />

这会帮我们生成一个product模块，包含 module、servive、contriller、entities、dto

<img src="D:\Download\notes\nest\笔记\assets\模块生成.png" style="zoom:80%;" />



- --flat 和 --no-flat 是指定是否生成对应目录的
- --spec 和 --no-spec 是指定是否生成测试文件
- --skip-import 是指定不在 AppModule 里引入
- --project，这是指定生成代码在哪个子项目的

### nest build

构建项目

```bash
nest build -h
```

<img src="D:\Download\notes\nest\笔记\assets\nest build -h.png" style="zoom:67%;" />

- --wepback 和 --tsc 是指定用什么编译，默认是 tsc 编译，也可以切换成 webpack

- --watch 是监听文件变动，自动 build 的

  但是 --watch 默认只是监听 ts、js 文件，加上 --watchAssets 会连别的文件一同监听变化，并输出到 dist 目录，比如 md、yml 等文件

- --path 是指定 tsc 配置文件的路径

- —-builder 选择使用指定的构建工具进行构建，可选工具包含 tsc、webpack、swc等

- —-config 指定 nest-cli 配置文件路径，即 nest-cli.json 文件，配置打包时后面命令的参数

  这样我们就不用在运行命令时后面跟一堆的参数配置

<img src="D:\Download\notes\nest\笔记\assets\nest-cli.png" style="zoom:67%;" />

### nest start

用于开启本地服务

![](D:\Download\notes\nest\笔记\assets\nest start.png)

- --watch 是最常用的选项了，也就是改动文件之后自动重新 build
- --debug 是启动调试的 websocket 服务，用来 debug
- --exec 可以指定用什么来跑，默认是用 node 跑，你也可以切换别的 runtime

其余选项和 nest build 一样，就不复述了

### nest info

查看nest相关依赖包信息

<img src="D:\Download\notes\nest\笔记\assets\nest i.png" style="zoom:67%;" />

这是基本的常用的一些 nest 命令， 全部的所有的命令在 [nest-cli](https://nest.nodejs.cn/cli/usages) 查看

## 装饰器

### 基本概念

顾名思义，装饰器（java中有个类似的概念叫注解）是用来装饰和拓展对象的功能的

### 种类

1. 类装饰器

2. 方法装饰器

3. 访问器装饰器

4. 属性装饰器

5. 参数装饰器

#### 一、类装饰器

- 作用：应用于类构造函数，修改类的定义增强类的功能
- 参数：constructor:Function

```ts
const doc:ClassDecorator = (target:Function) => {
  // 我们在类的原型上添加一个 name 属性
  target.prototype.name = 'Tom'
  
}

@doc
class Person {
  constructor(public age:number) {
    this.age = age
  }
}

const p = new Person(18) as any
console.log(p.name) // Tom
```

类装饰器工厂

如果觉得一个target 参数不够用，可以使用工厂函数来进行增强，因为target是一个函数类型通过传递参数的形式来进行拓展

```ts
const doc = (greeting: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.sayHello = () => {
      console.log(greeting)
    }
    target.prototype.name = 'Tom' // 添加name属性
  }
}

@doc('say hello')
class Person {
  public age: number
  constructor(age: number) {
    this.age = age
  }
}

const p: Record<string, any> = new Person(18)
console.log(p.name) // Tom
p.sayHello() // say hello
```

#### 二、方法装饰器

- 作用：修改类上的方法
- 参数：
  1. target: Object (被修饰的值)
  2. properKey:string (被修饰的属性键【方法名】)
  3. description: ProperDesctiptor(被装饰的方法的属性修饰符对象)

如果装饰是类的静态方法，target就是类本身，如果是实例方法则是类的原型对象

```ts
const Log: MethodDecorator = (target, propertyKey, descriptor) => {
  console.log(target)
  console.log(propertyKey)
  console.log(descriptor)
}

class User {
  @Log
  getName() {
    return 'Tom'
  }
}
```

![](D:\Download\notes\nest\笔记\assets\方法装饰器.png)

此时 target 是被修饰的类的原型 即 `User.prototype` 执行时机是在类定义是执行而不是方法调用时执行，此时类还没有被实例化

通过 descriptor.value 获取到方法来改变方法的实现，常用于日志记录，权限检查，性能监控等

#### 三、访问器装饰器

- 作用：应用于类的访问器（setter/getter)
- 参数：
  1. target: Object (被修饰的值)
  2. properKey:string (被修饰的属性键【方法名】)
  3. description: ProperDesctiptor(被装饰的方法的属性修饰符对象)

```ts
const Immutable: (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => void = (
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  console.log(target)
  console.log(propertyKey)
  console.log(descriptor)
  return descriptor
}

class User {
  private _name: string = 'Tom'
  @Immutable
  get name() {
    return this._name
  }
}
```

![](D:\Download\notes\nest\笔记\assets\访问器装饰器.png)

访问器装饰器于方法装饰器类似，区别就是它们的属性描述符中的某些键不同

方法装饰器

- value
- writable
- enumerable
- configuable

访问器装饰器

- get
- set
- enumerable
- configurable

不同装饰器的执行顺序

```ts
// 参数装饰器
function parameterDecorator(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`参数装饰器: ${propertyKey} 的第 ${parameterIndex} 个参数`);
}

// 方法装饰器
function methodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`方法装饰器: ${propertyKey}`);
}

// 属性装饰器
function propertyDecorator(target: any, propertyKey: string) {
    console.log(`属性装饰器: ${propertyKey}`);
}

// 访问器装饰器
function accessorDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`访问器装饰器: ${propertyKey}`);
}

// 类装饰器
function classDecorator(constructor: Function) {
    console.log('类装饰器');
}

@classDecorator
class ExampleClass {
    @propertyDecorator
    public property: string;

    @accessorDecorator
    get accessor() {
        return this.property;
    }

    @methodDecorator
    public method(@parameterDecorator param1: number, @parameterDecorator param2: string) {
        
    }
}

const example = new ExampleClass();
```

![](D:\Download\notes\nest\笔记\assets\装饰器的执行顺序.png)

- **参数装饰器**：`parameterDecorator` 会在方法参数上应用，在示例中，`method` 方法有两个参数，参数装饰器会从最后一个参数开始执行，也就是先执行 `param2` 的装饰器，再执行 `param1` 的装饰器。
- **方法装饰器**：`methodDecorator` 会在方法定义上应用，在参数装饰器执行完之后执行。
- **属性装饰器**：`propertyDecorator` 会在属性定义上应用，按照类中属性的顺序执行。
- **访问器装饰器**：`accessorDecorator` 会在访问器（getter/setter）上应用，在属性装饰器之后执行。
- **类装饰器**：`classDecorator` 会在类定义上应用，在所有其他装饰器执行完之后执行。

#### 四、属性装饰器

- 作用：应用于类的属性
- 参数：
  1. target: Object (被修饰的值)
  2. properKey:string (被修饰的属性键【方法名】)

```ts
/**
 * 属性装饰器
 */

// 定义一个属性装饰器，用于在类的属性上添加一个额外的属性或方法。

const Prop = (target,propertyKey) => {
  console.log(target) // 输出类的原型对象，即类的实例。
  console.log(propertyKey) // 输出属性的名称。
}

class User {
  @Prop
  name: string = 'jenny' 
}
```

![](D:\Download\notes\nest\笔记\assets\属性装饰器.png)

#### 五、参数装饰器

- 作用：应用于方法参数
- 参数：
  1. target: Object (被修饰的的类的原型)
  2. properKey：string | symbol (被装饰的类方法)
  3. parameterindex:num(被修饰的方法的参数索引位置)

```ts
const Param: ParameterDecorator = (target, propertyKey, parameterIndex) => {
  console.log(target) 
  console.log(propertyKey) 
  console.log(parameterIndex) 
}

class User {
  getName(@Param name: string) {
    return name
  }
}
```

![](D:\Download\notes\nest\笔记\assets\参数装饰器.png)

@Param 用于修饰类方法 getName 的参数，其中 target 是被修饰的原型

propertyKey 是被修饰的类方法

parameterIndex 是修饰方法参数的索引位置 

## 调试 nest 项目

### Chrome Dev Tools

```bash
npm start start：debug
```

<img src="D:\Download\notes\nest\笔记\assets\nest调试.png" style="zoom:67%;" />

以调试模式运行

![](D:\Download\notes\nest\笔记\assets\调试模式运行.png)



可以看到，它起了一个 ws 服务在9229，然后我们用调试客户端连上它

打开chrome上方地址栏输入 chrome://inspect/ 按下回车

导入项目文件夹

代码会在第10行断住，在右侧可以看到代码的执行路径

<img src="D:\Download\notes\nest\笔记\assets\断点调试.png" style="zoom:50%;" />

这样，就可以调试 nest 项目了。

但是这样调试还是太麻烦，我们一般在 VSCode 里写代码

### Vscode

添加 "showAsyncStacks": true, // 显示异步堆栈

<img src="D:\Download\notes\nest\笔记\assets\编辑器调试.png" style="zoom:47%;" />

再次访问 3000 端口

<img src="D:\Download\notes\nest\笔记\assets\编辑器调试2.png" style="zoom:67%;" />

可以看到代码在此处停住，在左侧可以看到代码的执行流程，变量以及调用堆栈



## controller

<img src="D:\Download\notes\nest\笔记\assets\Controller.png" style="zoom:50%;" />

控制器的目的是处理应用的特定请求。路由机制确定哪个控制器将处理每个请求。通常，控制器具有多个路由，每个路由可以执行不同的操作。

控制器的职责

- **处理路由和请求**，接收http请求并确定路由，一个控制器通常具有多个路由，各自的路由执行不同的操作
- **解析和校验数据**，控制器通常负责解析并验证请求的数据，例如使用管道或是DTO，控制器可以定义和进行数据验证、格式化、转换操作
- **调用Service**，Controller 层用于调度 Service 层执行业务逻辑处理，是 Service 层的入口

## Service

Service的职责

- **处理业务逻辑**，包含对数据的处理，外部系统的调用和复杂的业务逻辑的处理

- **数据持久化**，与数据库，Redis 缓存存储库进行交互，执行持久化操作，Service 中使用模型或是实体来对数据进行增删改查操作

  

## nest中的装饰器



## 模块

模块是一个用 `@Module()` 装饰器注释的类。此装饰器提供 Nest 用于有效组织和管理应用结构的元数据。

<img src="D:\Download\notes\nest\笔记\assets\03.png" style="zoom:50%;" />

Nest 提供了一套模块系统，通过 `@Module`声明模块

<img src="D:\Download\notes\nest\笔记\assets\01.png" style="zoom:67%;" />

通过 `@Controller`、`@Injectable` 分别声明其中的 `controller` 和 `provider`

<img src="D:\Download\notes\nest\笔记\assets\02.png" style="zoom: 45%;" />

​	

| 参数        | 作用                                                         |
| ----------- | ------------------------------------------------------------ |
| providers   | 注册当前模块的**服务（Service）**、**工厂（Factory）**、**工具类**等。这些提供者（Providers）会被 NestJS 的依赖注入（DI）系统管理 |
| controllers | 注册当前模块的**控制器（Controller）**，负责处理 HTTP 请求和路由 |
| imports     | 导入其他模块（如共享模块、第三方模块）。只有被导入的模块中导出的提供者（通过 `exports`）才能在当前模块中使用 |
| exports     | 导出当前模块的提供者（Providers），供其他模块使用。只有被导出的服务才能被其他模块访问。 |

常见模块类型

- 根模块

应用的入口模块，通常命名为 `AppModule`，通过 `@nestjs/core` 的 `NestFactory.create()` 启动

- 功能模块

  实现特定功能的模块（如 `UserModule`、`OrderModule`）

- 共享模块

  通过 `exports` 共享提供者，供多个模块复用

```ts
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
```

- 全局模块

  使用 `@Global()` 装饰器，使模块全局可见（其他模块无需导入即可使用）

  ```ts
  @Global()
  @Module({
    providers: [ConfigService],
    exports: [ConfigService],
  })
  export class ConfigModule {}
  ```

### 动态模块




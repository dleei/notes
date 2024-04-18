`typescript`是`JavaScript`的一个超集，所有的`Javascript`的所有的类型都在里面

### 字符串类型

在变量的后面使用：加类型定义限定变量的类型

```ts
let a: string = '123'
//普通声明
 
//也可以使用es6的字符串模板
let str: string = `dddd${a}`
```

### 数字类型

数字类型是支持，八进制，六进制，十进制，二进制等

```typescript
let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制s
```

### 布尔类型

```ts
let a1:boolean = true
let a2:boolean = false
```

### 空值类型

`JavaScript` 没有空值（Void）的概念，在`TypeScript` 中，可以用 `void` 表示没有任何返回值的函数，只是简单的调用不需要返回值

```ts
function voidFn(): void {
    console.log('test void')
}
```

`void` 类型的用法，主要是用在我们**不希望**调用者关心函数返回值的情况下，比如通常的**异步回调函数**

### null和undefined类型

```ts
let u: undefined = undefined;//定义undefined
let n: null = null;//定义null
```

**void 和 undefined 和 null 最大的区别**
与 void 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `string` 类型的变量：

```ts
//这样写会报错 void类型不可以分给其他类型
let test: void = undefined
let num2: string = "1"

num2 = test
//这样是没问题的
let test: null = null
let num2: string = "1"

num2 = test

//或者这样的
let test: undefined = undefined
let num2: string = "1"

num2 = test
```

TIPS 注意：
如果你配置了`tsconfig.json` 开启了严格模式

```ts
{
    "compilerOptions":{
        "strict": true
    }
}
```

### any类型

1.没有强制限定哪种类型，随时切换类型都可以 我们可以对 `any `进行任何操作，不需要检查类型

```ts
let anys:any = 123
anys = '123'
anys = true
```

2.声明变量的时候没有指定任意类型默认为`any`

```ts
let anys;
anys = '123'
anys = true
```

3.弊端如果使用any 就失去了TS类型检测的作用

4.TypeScript 3.0中引入的 unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给unknown

unknow  unknow类型比any更加严格当你要使用any 的时候可以尝试使用unknow

```ts
//unknown 可以定义任何类型的值
let value: unknown;
value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK
```

区别二

```ts
//这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
//unknown类型不能赋值给其他类型
let names:unknown = '123'
let names2:string = names

//这样就没问题 any类型是可以的
let names:any = '123'
let names2:string = names   

//unknown可赋值对象只有unknown 和 any
let bbb:unknown = '123'
let aaa:any= '456'

aaa = bbb
```

如果是any类型在对象没有这个属性的时候还在获取是不会报错的

```ts
let obj:any = {b:1}
obj.a
```

如果是unknow 是不能调用属性和方法

```ts
let obj:unknown = {b:1,ccc:():number=>213}
obj.b
obj.ccc()
```

object与Object类型的区别

Object类型与js中的原型链相关，原型链的顶端就是Object或者是function，也就意味着所有的原始类型，以及对象类型最终都会指向这个Object

在ts中的Object类型就表示包含所有的类型

object类型表示非原始类型，常用于泛型约束

```ts
let a1:object = 1  // 错误 属于原始类型
let a2:object = '123'  // 错误 属于原始类型
let a3:object = true  // 错误  属于原始类型
let a4:object = [] // 正确 非原始类型
let a5:object = {}  // 正确  非原始类型
let a6:object = ()=> 123  // 正确  非原始类型
```

### `{ }`字面量模式

```ts
let a:{ }  // 可以理解为 new Object，创建一个新对象支持所有的类型
let a:{ } = 123
let a:{ } = '123'
let a:{ } = []
let a:{ } = {name:张三}
```

字面量模式的对象类型是无法进行修改赋值操作的

### 接口和对象类型

在typescript中，我们定义对象的方式要用关键字interface（接口），我的理解是使用interface来定义一种约束，让数据的结构满足约束的格式。接口定义变量的命名建议使用大驼峰命名方案

定义方式如下：

```ts
//这样写是会报错的 因为我们在person定义了a，b，但是对象里面缺少b属性
//使用接口约束的时候不能多一个属性也不能少一个属性
//必须与接口保持一致
interface Person {
    b:string,
    a:string
}

const person:Person  = {
    a:"213"
}
//重名interface  可以合并
interface A{name:string}
interface A{age:number}
var x:A={name:'xx',age:20}
```

### 继承

```ts
interface A{
    name:string
}

interface B extends A{
    age:number
}

let obj:B = {
    age:18,
    name:"string"
}
```

### 可选属性 使用`?`操作符

```ts
//可选属性的含义是该属性可以不存在
//所以说这样写也是没问题的
interface Person {
    b?:string,
    a:string
}

const person:Person  = {
    a:"213"
}
```

### 任意属性 [propName: string]，索引签名

当后端返回了一个数据，我只是想要他其中的一部分数据，但是我又不知道其他的数据格式是什么样子的，这个时候就可以使用索引签名来添加一个类型，允许接口的对象里面是可以添加其他的属性的，在上面的字面量`{}`类型中无法添加属性也是可以使用这个方法来进行修改添加

```ts
interface OneType {
name：string
age：number
[propName:string]:any  // 属性名是任意的，它的类型也是任意的，因为我们不知道它的类型到底是什么样子的
}

let a:Onetype = {
name: '小磊'
age：18
gender: 男
}
```

### readonly属性

表示里面的属性是只读的，不允许修改，修改会报错，一般会使用在后端返回的唯一id，或是定义的函数

### 数组类型

数组的普通类型

方式1

```ts
let arr:number[] = [1,2,3,4] 
```

方式2，使用泛型表示

```ts
let Array<number> = [1,2,3,4]
```

使用 interface 定义对象数组

```ts
interface Array = {

name：string

age：number

}

let  arr: Array[] = [{name:'小磊'，age：18}，{name: '张三'，age：20}]
```

### 定义二维数组

```ts
let arr:number[][] = [[1],[2]]
//泛型定义
let arr:Array<Array<number>> = [[1],[2],[3]]
```

### 大杂烩类型数组

```ts
// 使用any类型定义
let arr:any[] = [1,'123',true,null]
// 元组类型定义
let arr:[number,string,boolean,null] = [1,'123',true,null]
```

### 函数类型定义

```ts
// 在函数的参数后面写类型，括号后面写函数对应的返回值
// 普通函数
function sum(a:number,b:number):number {
return a+b
}
// 箭头函数
// 使用 = 为参数设置默认值
// 使用 ？可设置可选参数，且必须在最后一位参数
const add(a:number,b:number = 1):number => a + b
```

### 联合类型

```ts
let phone:string | number = 123456 // 变量的类型同时支持字符串和数字
```

### 交叉类型

```ts
interface People {
name:string
age: number
}

interface Man {
gender:string
}

const lei = (person:People & Man):void => {
console.log(lei({name: '小磊',age: 18,gerder: '男'})) // 相当于 extend 继承，需要填写 gender 属性
}

```

### 类型断言

```ts
let fn = (number:number | string):void=> {
    console.log((number as string).length)
}
fn('1234') // 4
fn(12345)  // 在执行调用的时候并不会给予报错提示，类型断言可以欺骗编译器，无法避免运行时的错误，谨慎使用
```

### 内置对象

ECMAscript内置对象

Boolean Number String RegExp Date Error

```ts
let b: Boolean = new Boolean(1)
console.log(b)
let n: Number = new Number(true)
console.log(n)
let s: String = new String('早上吃的胡辣汤')
console.log(s)
let d: Date = new Date()
console.log(d)
let r: RegExp = /^1{6}$/
console.log(r)
let e: Error = new Error("error!")
console.log(e)
```

Dom和Bom内置对象

Document、HTMLElement、Event、NodeList等

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
//读取div 这种需要类型断言 或者加个判断应为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {
    console.log(e)
});
```

### 枚举类型

#### 数字枚举

例如红绿蓝，red=0，green=1，blue=2，分别代表红色为0，绿色为1，蓝色为2

```ts
enmu Types {
red,
green,
blue
}
```



```ts
enmu Types {
red = 0,
green = 1,
blue = 2
}
// 默认数字从 0 开始，可以不写
```

增长枚举

```ts
enmu Types {
red = 2,
green,
blue
}
// 定义了一个数字枚举，并将 red 初始化为 2，其余成员会从 2 开始自动增长
```

#### 字符串枚举

在一个字符串枚举里面，每一个成员都必须是字符串面量

```ts
enmu Types {
red = 'red',
green = 'green',
blue = 'blue'
}
```

由于字符串枚举没有自增长行为，字符串枚举可以很好的序列化。话句话说，如果你正在调试并且必须要读一个数字枚举时运行的值，这个值通常是很难读的，它并不能表达有用的消息，字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

#### 异构枚举

混合字符串和数字成员

```ts
enum type {
no:'no'
yes: 1
}
```

#### 接口枚举

定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds，在声明这个对象的时候要遵守这个规则

```ts
enum Type {
yyds,
ddd
}

interfaces A {
red:Types.yyds
}

let obj:A = {
red:Type.yyds
}
```

#### const枚举

const 声明的枚举会被编译成常量

普通声明的枚举编译完后是个对象

```ts
const enmu Types {
red = 0,
green = 1,
blue = 2
}
```

### 类型推论

ts编译器会自动推论变量的类型

我声明了一个变量但是没有明确指定这个变量的类型，TypeScript会在明确没有指定类型的时候推论出一个类型，这就是类型推论

```ts
let name = '小磊' // string类型
let age = 18 // number类型
...
```

如果你声明了一个变量没有定义类型，也没有赋值这个时候会被推断成any类型，可以进行任何操作

```ts
let username
username = 123
username = '123'
username = true
username = null
...
```

### 类型别名

type 关键字，可以给一个类型定义一个名字，多用于复合类型

#### 定义类型别名

```ts
// 说白了就是给变量后面的类型起一个名字，名字随意，可以简短一点
type username = string
let str:username = '小磊'
```

#### 定义函数别名

```ts
type str = () => string
let str:str  = () => 'anyscript'
```

#### 定义联合类型别名

```ts
type str = string | number
let str1:str = 123
let str2:str = '123'
```

#### 定义值的别名

```ts
type value = 123 | '123' | 456
let value:value = 123 // 变量value的值只能是上面value定义的值
```

type与interface的区别

```ts
interface A extends B {
 // interface 可以用 extends 继承属性
}
// 重名 interface 会合并
interface B {

}

type A = string & B  // type 只能使用 & 交叉类型来实现，合到一起
type C = number | string  // 可以使用联合类型
```

### 泛型

我们写了两个函数，一个是数字类型的函数，一个是字符串类型的函数，实现的功能是一样的，就只是类型不一样，这个时候我们就可以使用泛型来进行优化

```ts
const returnArr = (a:number,b:number):number => {
return [a,b]
}

const returnArr = (a:string,b:string):string => {
return [a,b]
}
return(1,2) // [1,2]
return('1','5') // ['1','5']

// 泛型优化
语法为函数名后加一个<参数名> ，这里的参数名可以是任意的，这里就用 T 来代替，表示 type 的意思
const returnArr<T> = (a:T,b:T):T => {
return [a,b]
}
在我们调用的时候把参数的类型传递进去就可以了，就实现了动态的类型
returnArr<number>(1,2)
returnArr<string>('1','6')

也可以同时使用多个泛型参数，只要是数量和使用方式能对应上就行
const returnArr<T,A> = (a:T,b:A):(T|A)[]=> {
    const result:(T|A)[] = [a,b]
    return result
}
```

#### 泛型约束

我们期望在一个泛型的变量上去获取它身上的length属性，但是有的数据类型是没有length属性

```ts
const getLength<T> = (value:T) => {
return value.length
}

// interfaces Len {
length:number
}
const getLength<T extends Len> = (value:T) => {
    return value.length
}
getLength<string>('12564') // 5
```

### never类型

never类型就像它的英文单词的意思一样，它表示的是一个永远不会发生值的类型，不可能存在的一个类型

可能会出现never类型的一些情况

函数抛出异常

如果一个函数抛出异常，那么它的返回值的类型就是never，因为在函数抛出异常后就会直接中断程序的运行，这意味着程序不会继续执行到函数返回语句的那一步

```ts
const throwError = (messge:string)=> {
throw new Error(message)
}
```

不会有返回值的函数

如果一个函数为一个死循环函数，比如while的无限死循环函数，那么该循环的类型就会被推断为never类型

```ts
const loop = () => {
 while(true) {
   console.log('hello,my name is jack')
  }
}
```

never 类型属于底层类型会被忽略，任何类型和never类型的联合类型都是其本身

```ts
type arr = void | number | never  // void | number
```

never类型与任何类型的交叉类型都是never类型

```ts
type a1 = number & never // never
type a2 = string & never // never
type a3 = boolean & never // never
```

never 可以赋值给任何类型

由于 never 类型是所有其他类型的子类型，所以可以将 never 赋值给任何其他类型

```ts
let n:never
let str:string = n
let num:number = n
let b:boolean = n
...
```

其他类型不能赋值给never类型

由于never属于底层类型，没有子类型，所以除了never类型本身，任何类型都不能赋值给never类型

```ts
let n:never
n = 'ikun' // ❌
n = 18 // ❌
n = true // ❌
...
```

### tsconfig.json配置文件

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

#### 常用属性

1.include
指定编译文件默认是编译当前目录下所有的ts文件

2.exclude
指定排除的文件

3.target
指定编译js 的版本例如es5  es6

4.allowJS
是否允许编译js文件

5.removeComments
是否在编译过程中删除文件中的注释

6.rootDir
编译文件的目录

7.outDir
输出的目录

8.sourceMap
代码源文件

9.strict
严格模式

10.module
默认common.js  可选es6模式 amd  umd 等

### 三斜线指令



### 声明文件 d.ts

声明文件declear

在使用第三方库的时候，我们为了得到对应的代码提示和接口提示，我们需要引用他的声明文件

下载第三方的声明文件

npm i @types/包名 -D

手写声明文件

创建一个 名称.d.ts文件

我们以express为例子

```ts
import express from 'express'
 
 
const app = express()
 
const router = express.Router()
 
app.use('/api', router)
 
router.get('/list', (req, res) => {
    res.json({
        code: 200
    })
})
 
app.listen(5001,()=>{
    console.log('server listen on 5001')
})
```

express.d.ts

```ts
declare module 'express' {
    interface Router {
        get(path: string, cb: (req: any, res: any) => void): void
    }
    interface App {
 
        use(path: string, router: any): void
        listen(port: number, cb?: () => void): void
    }
    interface Express {
        (): App
        Router(): Router
 
    }
    const express: Express
    export default express
}
```














































































































































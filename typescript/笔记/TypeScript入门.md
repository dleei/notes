## 概述

`TypeScript`（简称 TS）是微软公司开发的一种基于 `JavaScript` （简称 JS）语言的编程语言。

它的目的并不是创造一种全新语言，而是增强 `JavaScript` 的功能，使其更适合多人合作的企业级项目。

`TypeScript` 可以看成是 `JavaScript` 的超集（`superset`），即它继承了后者的全部语法，所有 `JavaScript` 脚本都可以当作 `TypeScript` 脚本（但是可能会报错），此外它再增加了一些自己的语法。

`TypeScript` 对 `JavaScript` 添加的最主要部分，就是一个独立的类型系统。简单来说就是它包含`js`所有的类型,还有属于自己的新的类型,会在原有的基础上加上类型限制



<img src="./../assets/ts-js.png"  />

类型（`type`）指的是一组具有相同特征的值。如果两个值具有某种共同的特征，就可以说，它们属于同一种类型。

举例来说，`123`和`456`这两个值，共同特征是都能进行数值运算，所以都属于“数值”（`number`）这个类型。

一旦确定某个值的类型，就意味着，这个值具有该类型的所有特征，可以进行该类型的所有运算。凡是适用该类型的地方，都可以使用这个值；凡是不适用该类型的地方，使用这个值都会报错。

可以这样理解，**类型是人为添加的一种编程约束和用法提示。** 主要目的是在软件开发过程中，为编译器和开发工具提供更多的验证和帮助，帮助提高代码质量，减少错误。``

```ts
const addCount = (num:number) => {
return count + 1
}
```

上述示例中声明一个 `addCount` 函数 ,调用后返回一个加一之后的数字,限制他传入的数字只能是数字类型,传入其他类型的值就会报错

```ts
addCount('你好')  // 错误
```

上面示例中，函数`addCount()`传入了一个字符串`你好`，`TypeScript` 发现类型不对，就报错了，指出这个位置只能传入数值，不能传入字符串。

`JavaScript` 语言就没有这个功能，不会检查类型对不对。开发阶段很可能发现不了这个问题，代码也许就会原样发布，导致用户在使用时遇到错误。

作为比较，`TypeScript` 是在开发阶段报错，这样有利于提早发现错误，避免使用时报错。另一方面，函数定义里面加入类型，具有提示作用，可以告诉开发者这个函数怎么用。

## 动态类型与静态类型

`TypeScript` 的主要功能是为 `JavaScript` 添加类型系统。大家可能知道，`JavaScript` 语言本身就有一套自己的类型系统，比如数值`123`和字符串`Hello`

但是，`JavaScript` 的类型系统非常弱，而且没有使用限制，运算符可以接受各种类型的值。在语法上，`JavaScript` 属于动态类型语言。

```ts
例一:
let a = "1"
a = 2
例二:
let ikun = {
hobby:()=> {
console.log('我会唱,跳,rap,打篮球')
}
name: 'chicken'
}
delete ikun.name
ikun.name = 'basketball'
```

上面的例一，变量`a`声明时，值的类型是字符串，但是后面可以改成数字。所以，无法提前知道变量的类型是什么，也就是说，变量的类型是动态的。可以随意的改动, 肆无忌惮, 为所欲为

上面的例二，变量`ikun`是一个对象，有一个爱好`hobby`，输出我会唱,跳,rap,打篮球, 有一个名字, `chicken`但是这个属性是可以删掉的，并且还可以新增其他属性。所以，对象有什么属性，这个属性还在不在，也是动态的，没法提前知道。

正是因为存在这些动态变化，所以 JavaScript 的类型系统是动态的，不具有很强的约束性。这对于提前发现代码错误，非常不利。

TypeScript 引入了一个更强大、更严格的类型系统，属于静态类型语言。

上面的代码在 TypeScript 里面都会报错。

```ts
例一:
let a = "1"
a = 2  // 报错
例二:
let ikun = {
hobby:()=> {
console.log('我会唱,跳,rap,打篮球')
}
name: 'chicken'
}
delete ikun.name  // 报错
ikun.name = 'basketball'  //报错
```

上面示例中，例一的报错是因为变量赋值时，`TypeScript` 已经推断确定了类型，后面就不允许再赋值为其他类型的值，即变量的类型是静态的。例二的报错是因为对象的属性也是静态的，不允许随意增删。

`TypeScript` 的作用，就是为 `JavaScript` 引入这种静态类型特征。

## 静态类型的优点

静态类型有很多好处，这也是 TypeScript 想要达到的目的。

（1）有利于代码的静态分析。

有了静态类型，不必运行代码，就可以确定变量的类型，从而推断代码有没有错误。这就叫做代码的静态分析。

这对于大型项目非常重要，单单在开发阶段运行静态检查，就可以发现很多问题，避免交付有问题的代码，大大降低了线上风险。

（2）有利于发现错误。

由于每个值、每个变量、每个运算符都有严格的类型约束，TypeScript 就能轻松发现拼写错误、语义错误和方法调用错误，节省程序员的时间。

```ts
let obj = { message: '' };
console.log(obj.messege); // 报错
```

上面示例中，不小心把`message`拼错了，写成`messege`。TypeScript 就会报错，指出没有定义过这个属性。JavaScript 遇到这种情况是不报错的。

```ts
const a = 0;
const b = true;
const result = a + b; // 报错
```

上面示例是合法的 JavaScript 代码，但是没有意义，不应该将数值`a`与布尔值`b`相加。TypeScript 就会直接报错，提示运算符`+`不能用于数值和布尔值的相加。

```ts
function hello() {
  return 'hello world';
}

hello().find('hello'); // 报错
```

上面示例中，`hello()`返回的是一个字符串，TypeScript 发现字符串没有`find()`方法，所以报错了。如果是 JavaScript，只有到运行阶段才会报错。

（3）更好的 IDE 支持，做到语法提示和自动补全。

IDE（集成开发环境，比如 VSCode）一般都会利用类型信息，提供语法提示功能（编辑器自动提示函数用法、参数等）和自动补全功能（只键入一部分的变量名或函数名，编辑器补全后面的部分）。

（4）提供了代码文档。

类型信息可以部分替代代码文档，解释应该如何使用这些代码，熟练的开发者往往只看类型，就能大致推断代码的作用。借助类型信息，很多工具能够直接生成文档。

（5）有助于代码重构。

修改他人的 JavaScript 代码，往往非常痛苦，项目越大越痛苦，因为不确定修改后是否会影响到其他部分的代码。

类型信息大大减轻了重构的成本。一般来说，只要函数或对象的参数和返回值保持类型不变，就能基本确定，重构后的代码也能正常运行。如果还有配套的单元测试，就完全可以放心重构。越是大型的、多人合作的项目，类型信息能够提供的帮助越大。

综上所述，TypeScript 有助于提高代码质量，保证代码安全，更适合用在大型的企业级项目。这就是为什么大量 JavaScript 项目转成 TypeScript 的原因。

## 静态类型的缺点  

静态类型也存在一些缺点。

（1）丧失了动态类型的代码灵活性。

动态类型有非常高的灵活性，给予程序员很大的自由，静态类型将这些灵活性都剥夺了。

（2）增加了编程工作量。

有了类型之后，程序员不仅需要编写功能，还需要编写类型声明，确保类型正确。这增加了不少工作量，有时会显著拖长项目的开发时间。

（3）更高的学习成本。

类型系统通常比较复杂，要学习的东西更多，要求开发者付出更高的学习成本。

（4）引入了独立的编译步骤。

原生的 JavaScript 代码，可以直接在 JavaScript 引擎运行。添加类型系统以后，就多出了一个单独的编译步骤，检查类型是否正确，并将 TypeScript 代码转成 JavaScript 代码，这样才能运行。

（5）兼容性问题。

TypeScript 依赖 JavaScript 生态，需要用到很多外部模块。但是，过去大部分 JavaScript 项目都没有做 TypeScript 适配，虽然可以自己动手做适配，不过使用时难免还是会有一些兼容性问题。

总的来说，这些缺点使得 TypeScript 不一定适合那些小型的、短期的个人项目。

## 起步安装

tsc 是一个 npm 模块，使用下面的命令安装（必须先安装 node环境）。

```shell
npm i typescript -g
## pnpm i typescript -g
## yarn add typescript -g
```

TypeScript 官方提供的编译器叫做 tsc，可以将 TypeScript 脚本编译成 JavaScript 脚本。本机想要编译 TypeScript 代码，必须安装 tsc。

根据约定，TypeScript 脚本文件使用`.ts`后缀名，JavaScript 脚本文件使用`.js`后缀名。tsc 的作用就是把`.ts`脚本转变成`.js`脚本。

检测是否安装成功

```bash
# 或者 tsc --version
tsc -v
Version 5.1.6
```

上面命令中，`-v`或`--version`参数可以输出当前安装的 tsc 版本

安装 tsc 之后，就可以编译 TypeScript 脚本了。

`tsc`命令后面，加上 TypeScript 脚本文件，就可以将其编译成 JavaScript 脚本。

```bash
tsc app.ts
```

上面命令会在当前目录下，生成一个`app.js`脚本文件，这个脚本就完全是编译后生成的 JavaScript 代码。

`tsc`命令也可以一次编译多个 TypeScript 脚本。

```bash
tsc file1.ts file2.ts file3.ts
```

上面命令会在当前目录生成三个 JavaScript 脚本文件`file1.js`、`file2.js`、`file3.js`。

tsc 有很多参数，可以调整编译行为。

**（1）--outFile**

如果想将多个 TypeScript 脚本编译成一个 JavaScript 文件，使用`--outFile`参数。

```bash
tsc file1.ts file2.ts --outFile app.js
```

上面命令将`file1.ts`和`file2.ts`两个脚本编译成一个 JavaScript 文件`app.js`。

**（2）--outDir**

编译结果默认都保存在当前目录，`--outDir`参数可以指定保存到其他目录。

```bash
tsc app.ts --outDir dist上面命令会在`dist`子目录下生成`app.js`。
```

**（3）--target**

为了保证编译结果能在各种 JavaScript 引擎运行，tsc 默认会将 TypeScript 代码编译成很低版本的 JavaScript，即3.0版本（以`es3`表示）。这通常不是我们想要的结果。

这时可以使用`--target`参数，指定编译后的 JavaScript 版本。建议使用`es2015`，或者更新版本。

```bash
tsc --target es2015 app.ts
```

**(4)   --watch**

在 tsc 后加上 -w 为 --watch的简写形式它会持续监听这个文件的变化

```bash
tsc -w  index.ts 
再新开一个终端, 使用 node 或是 nodemon 运行这个 index.js 文件   
```

**(6)   --noEmitOnError**

如果希望一旦报错就停止编译，不生成编译产物，可以使用`--noEmitOnError`参数

```bash
 tsc --noEmitOnError app.ts
```

上面命令在报错后，就不会生成`app.js`

**(7)   --noEmit**

只检查类型是否正确，不生成 JavaScript 文件。

```bash
 tsc --noEmit app.ts
```

上面命令只检查是否有编译错误，不会生成`app.js`。

## tsconfig.json

TypeScript 允许将`tsc`的编译参数，写在配置文件`tsconfig.json`。只要当前目录有这个文件，`tsc`就会自动读取，所以运行时可以不写参数

有了这个配置文件，编译时直接调用`tsc`命令就可以了

生成 `tsconfig.json` 配置文件

```ts
tsc --init // 会在根目录下生成一个 tsconfig.js 的配置文件
```

`tsconfig.json`是 TypeScript 项目的配置文件，放在项目的根目录。反过来说，如果一个目录里面有`tsconfig.json`，TypeScript 就认为这是项目的根目录。

如果项目源码是 JavaScript，但是想用 TypeScript 处理，那么配置文件的名字是`jsconfig.json`，它跟`tsconfig`的写法是一样的。

`tsconfig.json`文件主要供`tsc`编译器使用，它的命令行参数`--project`或`-p`可以指定`tsconfig.json`的位置（目录或文件皆可）。

```bash
tsc -p ./dir
```



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

## 类型声明

`TypeScript` 代码最明显的特征，就是为 JavaScript 变量加上了类型声明。

```ts
let name:string = 'ikun'
```

上面示例中，变量`name`的后面使用冒号，声明了它的类型为`string`。

类型声明的写法，一律为在标识符后面添加“冒号 + 类型”。函数参数和返回值，也是这样来声明类型。

```ts
// 例一：
function addCount（num:number）:number {
return num++
}
// 例二:
const toString = (num:number):string => {
    return String(num)
}
```

示例一中的普通函数`addCount`将入参的类型限定为数字类型并加一后返回,同时返回值的类型也是数字类型

示例二的箭头函数中，函数`toString()`的参数`num`的类型是`number`。参数列表的圆括号后面，声明了返回值的类型是`string`

### 字符串类型

```ts
//普通声明
 let a: string = '123'
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

### bigint 类型

bigint 类型包含所有的大整数。

```ts
const x:bigint = 123n;
const y:bigint = 0xffffn;
```

上面示例中，变量`x`和`y`就属于 bigint 类型。

bigint 与 number 类型不兼容。

```ts
const x:bigint = 123; // 报错
const y:bigint = 3.14; // 报错
```

上面示例中，`bigint`类型赋值为整数和小数，都会报错

注意，bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（即编译参数`target`不低于`es2020`）

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

### null 和 undefined 类型

undefined 和 null 是两种独立类型，它们各自都只有一个值

undefined 类型只包含一个值`undefined`，表示未定义（即还未给出定义，以后可能会有定义）

```ts
let x:undefined = undefined;
```

上面示例中，变量`x`就属于 undefined 类型。两个`undefined`里面，第一个是类型，第二个是值

null 类型也只包含一个值`null`，表示为空（即此处没有值）

```ts
const x:null = null;
```

上面示例中，变量`x`就属于 null 类型

### undefined 和 null 的特殊性

`undefined`和`null`既是值，又是类型 

作为值，它们有一个特殊的地方：任何其他类型的变量都可以赋值为`undefined`或`null`

```ts
let age:number = 24;

age = null;      // 正确
age = undefined; // 正确
```

```ts
const obj:object = undefined;
obj.toString() // 编译不报错，运行就报错
```

上面示例中，变量`obj`等于`undefined`，编译不会报错。但是，实际执行时，调用`obj.toString()`就报错了，因为`undefined`不是对象，没有这个方法。

为了避免这种情况，及早发现错误，TypeScript 提供了一个编译选项`strictNullChecks`。只要打开这个选项，`undefined`和`null`就不能赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

下面是 tsc 命令打开这个编译选项的例子。

```ts
// tsc --strictNullChecks app.ts

let age:number = 24;

age = null;      // 报错
age = undefined; // 报错
```

上面示例中，打开`--strictNullChecks`以后，`number`类型的变量`age`就不能赋值为`undefined`和`null`。

这个选项在配置文件`tsconfig.json`的写法如下。

```ts
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

打开`strictNullChecks`以后，`undefined`和`null`这两种值也不能互相赋值了。

```ts
// 打开 strictNullChecks

let x:undefined = null; // 报错
let y:null = undefined; // 报错
```

上面示例中，`undefined`类型的变量赋值为`null`，或者`null`类型的变量赋值为`undefined`，都会报错。

总之，打开`strictNullChecks`以后，`undefined`和`null`只能赋值给自身，或者`any`类型和`unknown`类型的变量。

```ts
let x:any     = undefined;
let y:unknown = null;
```

### **void 和 undefined 和 null 最大的区别**

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
let anys:any = 123  // 正确
anys = '123' // 正确
anys = true  // 正确
```

上面示例中，变量`anys`的类型是`any`，就可以被赋值为任意类型的值

变量类型一旦设为`any`，TypeScript 实际上会关闭这个变量的类型检查。即使有明显的类型错误，只要句法正确，都不会报错

2.声明变量的时候没有指定任意类型默认为`any`

```ts
let anys;
anys = '123'
anys = true
```

3.弊端如果使用any 就失去了TS类型检测的作用

```ts
let x:any = 'hello';

x(1) // 不报错
x.foo = 100; // 不报错
```

上面示例中，变量`x`的值是一个字符串，但是把它当作函数调用，或者当作对象读取任意属性，TypeScript 编译时都不报错。原因就是`x`的类型是`any`，TypeScript 不对其进行类型检查

由于这个原因，应该尽量避免使用`any`类型，否则就失去了使用 TypeScript 的意义

实际开发中，`any`类型主要适用以下两个场合

（1）出于特殊原因，需要关闭某些变量的类型检查，就可以把该变量的类型设为`any`

（2）为了适配以前老的 JavaScript 项目，让代码快速迁移到 TypeScript，可以把变量类型设为`any`。有些年代很久的大型 JavaScript 项目，尤其是别人的代码，很难为每一行适配正确的类型，这时你为那些类型复杂的变量加上`any`，TypeScript 编译时就不会报错

总之，TypeScript 认为，只要开发者使用了`any`类型，就表示开发者想要自己来处理这些代码，所以就不对`any`类型进行任何限制，怎么使用都可以

从集合论的角度看，`any`类型可以看成是所有其他类型的全集，包含了一切可能的类型。TypeScript 将这种类型称为“顶层类型”（top type），意为涵盖了所有下层

### 类型推论问题

对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`

```ts
function add(x, y) {
  return x + y;
}

add(1, [1, 2, 3]) // 不报错
```

上面示例中，函数`add()`的参数变量`x`和`y`，都没有足够的信息，TypeScript 无法推断出它们的类型，就会认为这两个变量和函数返回值的类型都是`any`。以至于后面就不再对函数`add()`进行类型检查了，怎么用都可以

这显然是很糟糕的情况，所以对于那些类型不明显的变量，一定要显式声明类型，防止被推断为`any`

TypeScript 提供了一个编译选项`noImplicitAny`，打开该选项，只要推断出`any`类型就会报错

```bash
$ tsc --noImplicitAny app.ts
```

上面命令使用了`noImplicitAny`编译选项进行编译，这时上面的函数`add()`就会报错。

这里有一个特殊情况，即使打开了`noImplicitAny`，使用`let`和`var`命令声明变量，但不赋值也不指定类型，是不会报错的。

```ts
var x; // 不报错
let y; // 不报错
```

上面示例中，变量`x`和`y`声明时没有赋值，也没有指定类型，TypeScript 会推断它们的类型为`any`。这时即使打开了`noImplicitAny`，也不会报错

```ts
let x;

x = 123;
x = { foo: 'hello' };
```

上面示例中，变量`x`的类型推断为`any`，但是不报错，可以顺利通过编译

由于这个原因，建议使用`let`和`var`声明变量时，如果不赋值，就一定要显式声明类型，否则可能存在安全隐患

`const`命令没有这个问题，因为 JavaScript 语言规定`const`声明变量时，必须同时进行初始化（赋值）

```ts
const x; // 报错
```

上面示例中，`const`命令声明的`x`是不能改变值的，声明时必须同时赋值，否则报错，所以它不存在类型推断为`any`的问题

`any`类型除了关闭类型检查，还有一个很大的问题，就是它会“污染”其他变量。它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错。

```ts
let x:any = 'hello';
let y:number;

y = x; // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```

上面示例中，变量`x`的类型是`any`，实际的值是一个字符串。变量`y`的类型是`number`，表示这是一个数值变量，但是它被赋值为`x`，这时并不会报错。然后，变量`y`继续进行各种数值运算，TypeScript 也检查不出错误，问题就这样留到运行时才会暴露

污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用`any`类型的另一个主要原因

### unknown 类型

为了解决`any`类型“污染”其他变量的问题，TypeScript 3.0 引入了[`unknown`类型](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)。它与`any`含义相同，表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像`any`那样自由，可以视为严格版的`any`。

`unknown`跟`any`的相似之处，在于所有类型的值都可以分配给`unknown`类型。

```ts
let x:unknown;

x = true; // 正确
x = 42; // 正确
x = 'Hello World'; // 正确
```

上面示例中，变量`x`的类型是`unknown`，可以赋值为各种类型的值。这与`any`的行为一致。

`unknown`类型跟`any`类型的不同之处在于，它不能直接使用。主要有以下几个限制。

首先，`unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）。

```ts
let v:unknown = 123;

let v1:boolean = v; // 报错
let v2:number = v; // 报错
```

上面示例中，变量`v`是`unknown`类型，赋值给`any`和`unknown`以外类型的变量都会报错，这就避免了污染问题，从而克服了`any`类型的一大缺点。

其次，不能直接调用`unknown`类型变量的方法和属性。

```ts
let v1:unknown = { foo: 123 };
v1.foo  // 报错

let v2:unknown = 'hello';
v2.trim() // 报错

let v3:unknown = (n = 0) => n + 1;
v3() // 报错
```

上面示例中，直接调用`unknown`类型变量的属性和方法，或者直接当作函数执行，都会报错。

再次，`unknown`类型变量能够进行的运算是有限的，只能进行比较运算（运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。

```ts
let a:unknown = 1;

a + 1 // 报错
a === 1 // 正确
```

上面示例中，`unknown`类型的变量`a`进行加法运算会报错，因为这是不允许的运算。但是，进行比较运算就是可以的。

那么，怎么才能使用`unknown`类型变量呢？

答案是只有经过“类型缩小”，`unknown`类型变量才可以使用。所谓“类型缩小”，就是缩小`unknown`变量的类型范围，确保不会出错。

```ts
let a:unknown = 1;

if (typeof a === 'number') {
  let r = a + 10; // 正确
}
```

上面示例中，`unknown`类型的变量`a`经过`typeof`运算以后，能够确定实际类型是`number`，就能用于加法运算了。这就是“类型缩小”，即将一个不确定的类型缩小为更明确的类型。

下面是另一个例子。

```ts
let s:unknown = 'hello';

if (typeof s === 'string') {
  s.length; // 正确
}
```

上面示例中，确定变量`s`的类型为字符串以后，才能调用它的`length`属性。

这样设计的目的是，只有明确`unknown`变量的实际类型，才允许使用它，防止像`any`那样可以随意乱用，“污染”其他变量。类型缩小以后再使用，就不会报错。

总之，`unknown`可以看作是更安全的`any`。一般来说，凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型。

在集合论上，`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`一样，也属于 TypeScript 的顶层类型。

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

### 包装对象类型

#### 概念

JavaScript 的8种类型之中，`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- boolean
- string
- number
- bigint
- symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```ts
'hello'.charAt(1) // 'e'
```

上面示例中，字符串`hello`执行了`charAt()`方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。

五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即`Symbol()`和`BigInt()`不能作为构造函数使用），但是剩下三种可以。

- `Boolean()`
- `String()`
- `Number()`

以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

```ts
const s = new String('hello');
typeof s   // 'object'
s.charAt(1)   // 'e'
```

上面示例中，`s`就是字符串`hello`的包装对象，`typeof`运算符返回`object`，不是`string`，但是本质上它还是字符串，可以使用所有的字符串方法。

注意，`String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

### 字面量类型

字面量模式的对象类型是无法进行修改赋值操作的

```ts
let a:{ }  // 可以理解为 new Object，创建一个新对象支持所有的类型
let a:{ } = 123
let a:{ } = '123'
let a:{ } = []
let a:{ } = {name:张三}
```

### object与Object类型的区别

大写的Object类型与js中的原型链相关，原型链的顶端就是Object或者是function，也就意味着所有的原始类型，以及对象类型最终都会指向这个Object

在ts中的Object类型就表示包含所有的类型

事实上，除了`undefined`和`null`这两个值不能转为对象，其他任何值都可以赋值给`Object`类型。

```ts
let obj:Object;

obj = undefined; // 报错
obj = null; // 报错
```

上面示例中，`undefined`和`null`赋值给`Object`类型，就会报错。

另外，空对象`{}`是`Object`类型的简写形式，所以使用`Object`时常常用空对象代替。

```ts
let obj:{};
 
obj = true;
obj = 'hi';
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a:number) => a + 1;
```

上面示例中，变量`obj`的类型是空对象`{}`，就代表`Object`类型。

显然，无所不包的`Object`类型既不符合直觉，也不方便使用。

小写的object类型表示非原始类型，即可以用字面量表示的对象，只包含对象、数组和函数，常用于泛型约束

```ts
let a1:object = 1  // 错误 属于原始类型
let a2:object = '123'  // 错误 属于原始类型
let a3:object = true  // 错误  属于原始类型
let a4:object = [] // 正确 非原始类型
let a5:object = {}  // 正确  非原始类型
let a6:object = ()=> 123  // 正确  非原始类型
```

大多数时候，我们使用对象类型，只希望包含真正的对象，不希望包含原始类型。所以，建议总是使用小写类型`object`，不使用大写类型`Object`。

注意，无论是大写的`Object`类型，还是小写的`object`类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中

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
//重名 interface 可以合并
interface A{name:string}
interface A{age:number}
const x:A={name:'xx',age:20}
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
let arr:Array<number> = [1,2,3,4]
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

联合类型（union types）指的是多个类型组成的一个新类型，使用符号`|`表示，小飞棍来喽！

![](./../assets/%E6%88%91%E5%85%A8%E9%83%BD%E8%A6%81.webp)

联合类型`A|B`表示，任何一个类型只要属于`A`或`B`，就属于联合类型`A|B`

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

枚举类型我的个人理解就是为类型起了一个名字，它对应这一个指定的数字或是字符串，在声明是就必须满足我们规定的类型，尽管我们也是可以手动来进行类型限定的，但是枚举类型的使用可以让我们给成员赋予有意义的名字，使得代码更加易读和理解

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
enum Types {
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

#### 同名 enmu 合并

多个同名的 Enum 结构会自动合并。

```ts
enum Foo {
  A,
}

enum Foo {
  B = 1,
}

enum Foo {
  C = 2,
}

// 等同于
enum Foo {
  A,
  B = 1，
  C = 2
}
```

同名 Enum 合并时，不能有同名成员，否则报错。

```ts
enum Foo {
  A,
  B
}

enum Foo {
  B = 1, // 报错
  C
}
```

#### const枚举（常量枚举）

const 声明的枚举会被编译成常量

普通声明的枚举编译完后是个对象

```ts
const enmu Types {
red = 0,
green = 1,
blue = 2
}
```

#### keyof 运算符

keyof 运算符可以取出 Enum 结构的所有成员名，作为联合类型返回

```ts
enum MyEnum {
  A = 'a',
  B = 'b'
}

// 'A'|'B'
type Foo = keyof typeof MyEnum;
```

如果要返回 Enum 所有的成员值，可以使用in运算符

```ts
enum MyEnum {
  A = 'a',
  B = 'b'
}

// { a: any, b: any }
type Foo = { [key in MyEnum]: any };
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

TypeScript 也可以推断函数的返回值。

```ts
function toString(num:number) {
  return String(num);
}
```

上面示例中，函数`toString()`没有声明返回值的类型，但是 TypeScript 推断返回的是字符串。正是因为 TypeScript 的类型推断，所以函数返回值的类型通常是省略不写的。

从这里可以看到，TypeScript 的设计思想是，类型声明是可选的，你可以加，也可以不加。即使不加类型声明，依然是有效的 TypeScript 代码，只是这时不能保证 TypeScript 会正确推断出类型。由于这个原因，所有 JavaScript 代码都是合法的 TypeScript 代码。

这样设计还有一个好处，将以前的 JavaScript 项目改为 TypeScript 项目时，你可以逐步地为老代码添加类型，即使有些代码没有添加，也不会无法运行

### 非空断言

这是`typescript`的一种特殊语法，可以在不进行任何显式检查的情况下从类型中删除 `null` 和 `undefined`，在一个表达式之后填上 `！` ，表示我断定这个值一定不是`null`或是`undefined`，你不要给我多管闲事了

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

### 泛型

很多的时候比如说函数在使用的时候，我们并不知道它需要什么样的参数，那我们就可以在调用的时候把类型给传进去，定义类型的时候使用一个变量来保存，可以简单理解为，就是使用一个 slot 来占位

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

#### 类型参数默认值

类型参数可以设置默认值。使用时，如果没有给出类型参数的值，就会使用默认值。

```ts
function getFirst<T = string>(
  arr:T[]
):T {
  return arr[0];
}
```

上面示例中，T = string表示类型参数的默认值是string。调用getFirst()时，如果不给出T的值，TypeScript 就认为T等于string。

但是，因为 TypeScript 会从实际参数推断出T的值，从而覆盖掉默认值，所以下面的代码不会报错。

```ts
getFirst([1, 2, 3]) // 正确
```

上面示例中，实际参数是[1, 2, 3]，TypeScript 推断 T 等于number，从而覆盖掉默认值string。



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














































































































































# react入门

## react是什么?

React 是一个开源的 JavaScript 库，由Facebook开发，主要用于构建用户界面，特别是复杂的单页应用程序(SPA)。它专注于视图层，即用户界面的开发，可以与多种库或框架结合使用，以管理应用程序的状态和数据流动。

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/react.png)

## React 的特点：

1. **虚拟 DOM**：
   - React 引入了虚拟 DOM 的概念，这是一种内存中的轻量级数据结构，表示实际 DOM 的抽象。当应用状态改变时，React 会高效地计算出虚拟 DOM 的最小变更量，并将这些变更应用到实际 DOM 上，从而大幅提升了性能。
2. **组件化开发**：
   - React 鼓励采用组件化的方式来构建 UI，即将 UI 分解为可复用的独立组件。每个组件负责管理自己的状态(state)和属性(props)，这样可以提高代码的模块化程度，易于维护和重用。
3. **单向数据流**：
   - React 推崇一种单向数据流的架构，数据通常自上而下地传递给组件树，这简化了状态管理和问题追踪，减少了数据流动的复杂性。
4. **JSX**：
   - JSX 是一种语法扩展，允许在 JavaScript 中混写 HTML 样式的代码。这使得描述 UI 结构变得更加直观和简洁，同时也方便静态代码分析工具进行检查。
5. **服务器端渲染**：
   - React 支持服务器端渲染(SSR)，这对于改善首屏加载速度和搜索引擎优化(SEO)非常有利。

## React 的优势：

- **性能优化**：通过虚拟 DOM 减少了直接操作实际 DOM 的次数，提升了应用运行效率。
- **易学易用**：React 的学习曲线相对较平缓，开发者可以快速上手并开始开发。
- **强大的生态系统**：React 拥有庞大的社区支持和丰富的第三方库，如 Redux、React Router 等，可以满足各种开发需求。
- **代码复用与模块化**：组件化的开发方式促进了代码的复用，使得开发大型项目更加高效。
- **兼容性和灵活性**：React 不限定于特定的技术栈，可以与多种后端技术和前端库集成，提供了高度的灵活性。
- **React Native**：React 的理念还延伸到了原生移动应用开发，React Native 允许使用相同的开发模式来构建原生移动应用，实现了跨平台开发能力。

这些特点和优势使得 React 成为了现代Web开发中极为流行的工具之一。

## 初始化一个react项目

输入以下命令来创建一个新的React项目，其中`react-demo`替换为你想要的项目名称：

```bash
npx creact-react-app react-demo
```

使用 npx 命令会自动安装React及相关依赖，并设置好项目的基本结构

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E5%88%9D%E5%A7%8B%E5%8C%96react%E9%A1%B9%E7%9B%AE.png" style="zoom: 50%;" />

cd 切换到创建的文件夹

使用 `npm starrt` 启动项目

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E7%AC%AC%E4%B8%80%E4%B8%AAreact%E9%A1%B9%E7%9B%AE.png" style="zoom:50%;" />

## 项目的目录结构

```
react-demo
    ├─ node_modules
    ├─ public
	├─ favicon.ico
	├─ index.html
	├─ logo192.png
	├─ logo512.png
        ├─ manifest.json
        ├─ robots.txt
    ├─ src
        ├─ App.css
        ├─ App.js
	├─ App.test.js
	├─ index.css
	├─ index.js
	├─ logo.svg
	├─ reportWebVitals.js
        ├─ setupTests.js		
    ├─ package.json
```

下边我们分别来说一下每个文件（夹）的作用：

### Node_modules

node的包目录，项目所依赖到的所有第三方包,没啥可说的

### Public

public用来存放首页模板及静态资源，该目录中除了`index.html`都可以删除

- index.html 首页模板（不能删）
- favicon.ico 收藏夹图标（可以删，开发中会替换为自己的图标）
- logoxxx.png React的Logo（删）
- manifest.json（PWA的配置文件，大部分情况没啥用，删）
- robots.txt（搜索引擎配置文件，可删）

### Src

源码目录,我们写代码就是在这里

index.js

项目入口文件，不能删。

index.css

index.js的样式表，可改可删

App.js

主组件，可改可删

App.css

App.js的样式表，可改可删

xxx.test.js

带有test的都是单元测试的文件，可删

reportWebVitals.js

应用性能统计相关的代码，简单说用户在使用应用时，该模块可以统计用户加载应用所花费的时间，并且根据需要发送给统计服务器，如果没有相关需求可删。

## 编写我们的第一个react应用,浅尝一下

```jsx
// app.tsx
function App() {
  return <div className="App">你好,这是我的第一个react项目!</div>;
}

export default App;
```



```jsx
import { createRoot } from "react-dom/client"; // react18 的新方法, 创建根节点,替代原来的 createDOM

import App from "./App.tsx";  // 导入 app 组件,也是入口文件和顶级组件
/**
 * createRoot 接收一个 DOM 元素作为参数,返回一个根节点,在后面继续链式调用 render 方法渲染根组件到获取的 dom 元素中
 */
createRoot(document.querySelector("#root")).render(<App />);
```

<span style='color:#2930ff;font-size:20px'>createRoot()</span>

 `createRoot(domNode, options?)`

`domNode`：一个 ,DOM 元素React 将为这个 DOM 元素创建一个根节点然后允许你在这个根节点上调用函数

`options?`:可选的根节点配置对象

返回值

`createRoot` 返回一个带有两个方法的的对象，这两个方法是：`render`和 `unmount`

<span style='color: #2930ff;font-size:23px'>unmount()</span>

调用 `unmount` 以销毁 React 根节点中的一个已经渲染的树

返回值

返回 `undefined`

<span style='color: #2930ff;font-size:23px'>render()</span>

- **用来将React元素渲染到根元素中**
- **首次调用 `root.render` 时，React 会先清空根节点中所有已经存在的 HTML，然后才会渲染 React 组件**
- **重复调用会在内部进行diff算法,将两次渲染结果进行比较,只修改发生变化的部分,避免没必要的更新,提高性能**

react17 写法,不建议使用,后续可能会不再维护

```jsx
import React from "react"; // react 核心包,在 17 之前不手动导入会报错,在 17 之后可选不用手动导入
import ReactDOM from "react-dom"; 
import App from "./App.jsx";  // 导入App组件，作为应用的入口

// 使用ReactDOM.render方法，将<App />组件渲染到id为"root"的DOM元素中
ReactDOM.render(<App />, document.querySelector("#root")); // 接收两个参数要渲染的结构和目标 DOM
```

在react的核心包中`createRoot`方法创建根节点,还有一个方法`createElement`创建react元素,且创建后无法修改,只能覆盖

```jsx
import { createElement } from 'react-dom/client'
createElemnet('div',{id:'box',type:'div',className:'btn',onClick:()=>{alert('哎呀!你干嘛.')}},'你好!我是蔡徐坤') 
// 接收三个参数,第一个是创建元素的类型,第二个是元素对应的一些样式的配置对象,第三个参数是要填充的内容
```

> 元素名称必须为html格式的小写
>
> 标签中的属性class属性使用className,设置事件属性名采用驼峰命名
>
> 元素的内容,子元素,直接在后面使用逗号隔开添加

## jsx概念

JSX是JavaScript XML的缩写，它是一种用于在React中编写UI组件的语法扩展。JSX允许开发者在JavaScript代码中编写类似HTML的结构，使得编写和阅读React组件更加直观和简洁。虽然它看起来像是在JavaScript中直接写HTML，但实际上，JSX被编译成普通的JavaScript函数调用，这些函数调用会创建虚拟DOM元素树，最终渲染为真实的DOM元素。

### jsx本质

JSX并不是标准的JS语法，它是JS的语法扩展，浏览器本身不能识别，需要通过解析工具做解析之后才能在浏览器中运行

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/babel%E8%A7%A3%E6%9E%90.png)

jsx是声明式编程，简单理解就是以<font color='red'>结果</font>为导向，就像是你的老板，我不管你的过程我只要结果

```jsx
// 命令式编程
// 使用createElement创建一个react元素，就相当于我告诉你，我给你10块钱，出门右转，到第二个红路灯路口右转，到旁边的商店买一包盐，再怎么怎么回来
const button = createElement('button',{},'按钮')

// 使用jsx 面向结果声明式编程，以结果为导向
//  可以简单理解为，我告诉你家里炒菜现在没盐了，想办法整一包来，我不管你是使用什么方法 
const button = <button>我是按钮</button>

```

### jsx中使用js表达式

在jsx中可以通过 大括号语法`{ }`识别JavaScript中的表达式，比如常见的变量、函数调用、方法调用等等

```jsx
<script setup>
 const app = <div calssName="app">
          // 使用引号传递字符串
          {'php是世界上最好的语言'}
          // 识别变量
          const name = tom
          { name }
          // 函数调用
          const getUserInfo = () => {
              return { name: Tom , age: 18 }
          }
          { getUserInfo() }
          // 方法调用
          { New Date().getDate() }
          //使用js对象
          <div style={{color:'red'}}>Hello World</div> // 外层{ }识别表达式语法,内层{ }为对象
      </div>
</script>
```

​	

> 注意：
>
> - jsx不是字符串，不要加引号
> - jsx中的html标签小写开头，React组件为大写开头
> - jsx有且只有一个根标签，必须正确结束
> - 布尔类型、Null 、直接写对象的形式以及 Undefined 将会忽略
> - if语句、Switch语句、变量声明属于语句，不是表达式，不能出现在{ }中

`jsx`只允许只有一个根标签，我们也可以使用<Fragment></Fragment> 的虚拟根标签来包裹内容，最终是不会渲染出来的，可以理解为vue中的`template`标签

```tsx
import { Fragment } from "react/jsx-runtime";

export default function App() {
  return (
    <Fragment>
      <h1>Hello, world!</h1>
    </Fragment>
  )
}

简写形式
export default function App() {
  return (
    <>
      <h1>Hello, world!</h1>
    </>
  )
}
```

上面提到了一些像布尔类型，null和undefined是不会显示的，那如果我们在调试的时候需要显示那该怎么办呢？

通过值 加上空字符串的形式来解决，对象我们可以使用JSON.stringify()转成字符串的形式来显示

```tsx
export default function App() {
  return (
    <>
     <div>
      { false + ''}
      <br />
      { true + ''}
      <br />
      { undefined + ''}
      <br />
      {JSON.stringify({name: 'tom', age: 30})}
      <br />
     </div>
    </>
  );
}
```

### 列表渲染

```jsx
const heroList = [
  {
    id: 1,
    name: '锐雯',
    lane: '上单',
  },

  {
    id: 2,
    name: '泰拉米尔',
    lane: '上单',
  },

  {
    id: 3,
    name: '奎因',
    lane: '上单',
  },

  {
    id: 4,
    name: '奥恩',
    lane: '上单',
  },

  {
    id: 5,
    name: '亚索',
    lane: '中单',
  },

  {
    id: 6,
    name: '李青',
    lane: '打野',
  },

  {
    id: 7,
    name: '努努',
    lane: '打野',
  },

  {
    id: 8,
    name: '艾希',
    lane: 'ADC',
  },

  {
    id: 9,
    name: '薇恩',
    lane: 'ADC',
  },

  {
    id: 10,
    name: '卡特琳',
    lane: '辅助',
  },

  {
    id: 11,
    name: '莫德凯撒',
    lane: '辅助',
  },
]

function getHeroList() {
  return (
    <ul>
      {heroList.map(hero => (
        <li key={hero.id}>{hero.name}&nbsp;&nbsp;分路:{hero.lane}</li>
      ))}
    </ul>
  )
}

export default getHeroList;

```

### 条件渲染

```jsx
export const isLogin = false

export selectedValue = 1

export const getOptions = (val)=>{
if (val === 1) {
  return <div>选项1</div>
}else if (val === 2) {
  return <div>选项2</div>
}else {
  return <div>选项3</div>
 }
}

function App() {
    return (
        // 需要判断两个内容的显示隐藏的时候 可以使用 if else 或是使用简短的三元
    <div>{ isLogin ? '登录成功' : '未登录' }</div> // 未登录
        // 只需判断一个内容显示隐藏,无需使用 else 的时候,可以选择逻辑或 && 来判断,当值为真时,显示,否则反之
    <div>{ isLogin && '登录成功!' }</div> 
        // 判断多组内容
        //无法在 jsx 内书写 if else 语句 我们通过调用函数来判断,在函数内进行 if else 判断
     <div>{ getOptions }</div>
    )
}
```

### 响应事件

```jsx
function myButton () {
    const handleClick = () => alert('喜中500万,请到缅北kk园区兑换!')
    return (
    <button onClick={ handleClick }>开奖</button>
    )
}
```

> `onClick={handleClick}` 的结尾没有小括号！不要调用事件处理函数：你只需把函数传递给事件即可。当用户点击按钮时 React 会调用你传递的事件处理函数。

传递参数

通过一个箭头函数的回调来传值

```tsx
export default function App() {
  const handleClick = (e: any, value: object) => {
    console.log(e, value);
  };

  return (
    <>
      <button onClick={(e) => handleClick(e, {name: '123', age: 123})}>点击按钮</button>
    </>
  );
}
```

### 组件点标记写法

有两种方式，一种是对象的方式，一种是函数的形式

```tsx
// 函数的形式
const App = () => {
 return (
  <>
  <div>hello</div>
  <User/>
  </>
 )
}

const User = () => {
  return (
    <div>Welcome</div>
  )
}

export default App;
```

```tsx
// 对象的形式
const App = () => {
 return (
  <>
  <div>hello</div>
  <Abc.User/>
  <Abc.Info/>
  </>
 )
}

 const Abc = {
  User() {
    return <div>Welcome</div>
  },
  Info() {
    return <div>Info</div>
  },
}
```

这种好处就是我们可以在一个单独的模块下维护多个属于这一个类型的组件，在使用时就知道这个组件是属于哪一个大模块下的，方便维护

同样你也可以选择使用解构，如果你愿意的话

## 组件通讯

### 父向子通讯

> react中不支持子向父传值
>
> 传递给子组件的数据是只读的，不允许进行修改

#### 传递字符串，变量

```tsx
const App = () => {
  const text = '你好 React！'
  return (
    <>
      <div>
        父组件
        <User
          name='张三'
          text={text}
        /> // 在父组件中使用属性向子组件传值
      </div>
    </>
  )
}
// 在子组件中可以使用 porps 进行接收或是对其进行解构渲染，结果是以对象的形式进行包裹
const User = ({ name, text }) => {
  return (
    <>
      <div>子组件：user界面</div>
      <div>{name}</div>
      <div>{text}</div>
    </>
  )
}
export default App
```

#### 传递函数，事件

#### 事件

```tsx
const App = () => {
  const getMsg = () => {
    alert('调用了父组件的方法')
  }
  return (
    <div>
      <h1>父组件</h1>
      <Child onClick={getMsg} />  // 这里的 onClick 相当于就是一个属性用来传递数据的，所以在点击时并不会触发点击事件
    </div>
  )
}
// 使用解构接收这个事件，并绑定在子组件的 button 按钮上
 const Child = ({ onClick }) => {
  return (
    <div>
      <h1>子组件</h1>
      <button onClick={onClick}>点击</button>
    </div>
  )
}

export default App
```

#### 自定义函数

```tsx
const App = () => {
  const getData = data => { // 接收子组件传递来的数据并打印
    console.log(data)
  }
  return (
    <div>
      <h1>父组件</h1>
      <Child getData={getData} />  // 向子组件传递了一个自定义函数
    </div>
  )
}
// 使用解构接收这个函数
const Child = ({ getData }) => {
  const text = '来自遥远的子组件的数据'
  return (
    <div>
      <h1>子组件</h1>
      <button onClick={getData(text)}>点击</button> // 在子组件中点击触发这个自定义函数，并传递数据
    </div>
  )
}

export default App
```

#### 使用扩展运算符批量传递数据

```tsx
const App = () => {
  const data = {
    name: '张三',
    age: 18,
    gender: '男',
    address: '北京市',
    hobby: ['篮球', '足球', '游泳'],
  }
  return (
    <div>
      <h1>父组件</h1>
      <Child {...data} />
    </div>
  )
}

const Child = ({ name, age, gender, address, hobby }) => {
  return (
    <div>
      <h1>子组件</h1>
      <h3>{name}</h3>
      <h3>{age}</h3>
      <h3>{gender}</h3>
      <h3>{address}</h3>
      <ul>
        {hobby.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    </div>
  )
}

export default App
```

#### 特殊的children属性

当内容嵌套在子组件中的标签中时，父组件会在children属性中进行接收

```tsx
const Son = ({children}) => {
  return(
    <div>{children}</div>
  )
}

const App = () => {
  return (
    <>
      <Son>
        <div>子组件中的数据</div>
      </Son>
    </>
  )
}

export default App

```



### 子向父通讯

```tsx
// 父组件
import { useState } from 'react'
import Son from './Son'

const App = () => {
  const [msg, setMsg] = useState('hello')
  const getMsg = msg => {
    setMsg(msg)
  }
  return (
    <>
      <div>
        <span>{msg}</span>
        <Son onGetMsg={getMsg} />
      </div>
    </>
  )
}

export default App
```



```tsx
// 子组件
 // 在子组件中调用父组件的函数并传递实参
 const Son = ({onGetMsg}) => {
  const msgText: String = 'hello world'
  return (
    <>
      <div>
        this is Son: 
        <button onClick={()=>onGetMsg(msgText)}>send</button>
      </div>
    </>
  )
}

export default Son
```

### 兄弟组件通讯（也就是下面案例中的组件共享数据）

借助状态提升，通过数据下放，实现兄弟组件之间的数据通讯

在a页面点击发送数据到父组件，再由父组件传递数据给b页面实现数据传递

```tsx
// 父组件
import { useState } from 'react'
import A from './A'
import B from './B'

const App = () => {
  const [msg, setMsg] = useState("")

  const getMsg = (text)=> {
    setMsg(text)
  }

  return (
    <>
    <A onGetMsg={getMsg} />
    <B msg={msg}/>
    </>
  )
}

export default App

```



```tsx
// a页面
const A  = ({onGetMsg})=> {
  const aText = 'this is a text'
  return (
    <>
    <div>page a</div>
    <button onClick={()=> onGetMsg(aText)}>send</button>
    </>
  )
}

export default A; // export default A;
```

```tsx
// b 页面
const B  = ({msg})=> {
  return (
    <>
    <div>page b</div>
    <div>a 页面的数据：{msg}</div>
    </>
  )
}

export default B; // export default B;
```



#### 传递设置默认值

```tsx
const App = () => {
  const number = 100
  const data = 'App组件数据内容'
  return (
    <div>
      <h1>父组件</h1>
      <Child
        number={number}
        data={data}
      />
    </div>
  )
}

// 方式一：使用 es6 添加默认值的方式，直接在后面赋值
const Child = ({ number = 0, data = '默认显示的数据' }) => {
  return (
    <div>
      <h2>子组件</h2>
      {number}
      <hr />
      {data}
    </div>
  )
}

const Child = ({ number, data }) => {
  return (
    <div>
      <h2>子组件</h2>
      {number}
      <hr />
      {data}
    </div>
  )
}
// 方式二: 使用 react 提供的defaultProps 属性，在组件中添加默认值
Child.defaultProps = {
  number: 0,
  data: '默认显示的数据',
}

export default App
```

### 更新数据,设置数据

在 `vue3` 中我们使用 `ref` 和 `reactive` 来声明响应式数据

而在 `react` 中我们使用 `useState` 钩子，来创建一个响应式数据,通过 count 来访，通过 setCount 来修改数据

```tsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
// 你将从 useState 中获得两样东西：当前的 state（count），以及用于更新它的函数（setCount）。你可以给它们起任何名字，但按照惯例会像 [something, setSomething] 这样为它们命名
  return (
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>按钮</button>
      </div>
  )
}

```

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE.gif)

一个组件中与多个相同的组件，数据之间是相互隔离的

```tsx
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>数据更新</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      当前数据： {count} 
    </button>
  );
}
```

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E6%95%B0%E6%8D%AE%E7%8B%AC%E7%AB%8B%E7%BB%B4%E6%8A%A4.gif" style="zoom:80%;" />

### react中的“计算属性”

使用 useMemo 钩子 

```tsx
import { useMemo, useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(1)
  // useMemo 有两个参数，
  // 第一个参数是一个计算函数，返回一个经过计算缓存之后的值
  // 第二个参数是一个依赖数组，当依赖数组中的值发生变化时，才会重新计算缓存值

  const double = useMemo(() => {
    return count * 2
  }, [count])
  return (
    <>
      <button onClick={() => setCount(count + 1)}>double</button>
      <div className='fs20'>{double}</div>
    </>
  )
}

export default App
```

### 组件间共享数据

```tsx
import { useState } from 'react';

export default function MyApp() { 
  // 在 MyApp 组件中定义 count 状态和 handleClick 事件处理函数
  const [count, setCount] = useState(0);

  function handleClick() {
    // 当按钮被点击时，更新 count 状态
    setCount(count + 1);
  }

  return (
    <div>
      <h1>数据更新</h1>
      {/* 将 handleClick 函数和 count 状态通过 props 传递给 MyButton 组件 */}
      <MyButton onClick={ handleClick } count={ count }/>
      <br/>
      <MyButton onClick={ handleClick } count={ count }/>
    </div>
  );
}

// MyButton 组件接收 onClick 和 count 作为 props
function MyButton({ onClick, count }) {
  // 当按钮被点击时，调用父组件传递过来的 onClick 函数
  return (
    <button onClick={ onClick }>
      {/* 显示从父组件传递来的 count 值 */}
      当前数字为：{ count }
    </button>
  );
}

```

1. 我们将 `count` 状态和 `handleClick` 事件处理函数从 `MyButton` 组件移动到了 `MyApp` 组件中。这种做法称为“状态提升”，可以将共享的状态和行为放在更高层级的组件中。
2. 在 `MyApp` 组件中，我们通过 props 将 `handleClick` 函数和 `count` 状态传递给每个 `MyButton` 组件。这样，每个按钮都可以访问相同的状态和行为。
3. 在 `MyButton` 组件中，我们接收 `onClick` 和 `count` 作为 props，并将 `onClick` 函数绑定到按钮的点击事件上。每个按钮显示的数字都是从父组件传递过来的 `count` 值。

<img src="https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E6%95%B0%E6%8D%AE%E5%85%B1%E4%BA%AB.gif" style="zoom:80%;" />

### 组件的排列组合

一个父组件里面套了一个子组件，那如果我想在子组件里面接着嵌套其他的功能模块的时候是把它放到子组件的内容里面吗？

我们来 try 一 try

```tsx
const App = () => {
  return (
    <div>
      <h1>父组件</h1>
      <Child />
    </div>
  )
}

const Child = () => {
  return (
    <div>
      <h2>子组件</h2>
      <Other />
      <List />
    </div>
  )
}

const Other = () => {
  return (
    <div>
      <h3>其他组件</h3>
    </div>
  )
}

const List = () => {
  return (
    <div>
      <h3>列表组件</h3>
    </div>
  )
}

export default App
```

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E7%BB%84%E4%BB%B6%E7%9A%84%E7%BB%84%E5%90%88.png)

可以实现效果

这样就会出现一个问题，就是我子组件里面的组件想要去拿取数据只能是在相对于它自己的父级，涉及到了一个作用域的问题

```tsx
const App = () => {
  const appData = 'App组件数据内容'
  return (
    <div>
      <h1>父组件</h1>
      <Child />
    </div>
  )
}

const Child = () => {
  const childData = 'Child组件数据内容'
  return (
    <div>
      <h2>子组件</h2>
      <Other data={childData} />
    </div>
  )
}

const Other = ({ data }) => {
  return (
    <div>
      <h3>其他组件 :{data}</h3>
    </div>
  )
}

export default App
```

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E7%BB%84%E4%BB%B6%E7%9A%84%E7%BB%84%E5%90%88-1.png)

所以在实际开发中一般使用 props 里面的另外一个属性 children 属性来渲染组件内的任何子元素

> 注意是小写

```tsx
const App = () => {
  const data = '父组件数据'
  return (
    <div>
      <h1>父组件</h1>
      <Child>
        <Other data={data} />
      </Child>
    </div>
  )
}

const Child = ({ children }) => {
  return (
    <div>
      <h2>子组件</h2>
      {children}
    </div>
  )
}

const Other = ({ data }) => {
  return (
    <div>
      <h3>其他组件{data}</h3>
    </div>
  )
}

export default App
```

这样就实现了跨层级之间的数据传递

![](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/%E7%BB%84%E4%BB%B6%E7%9A%84%E7%BB%84%E5%90%88-2.png)

但是如果我想要传递多个内容并把它放在指定不同的位置，该如何实现呢？

这个和 vue 中的插槽的功能有一些相像，都是向组件内分发内容,不过 vue 是可以通过具名插槽来进行指定的分发和接收

vue 的实现方式

```tsx
// app.vue
<script setup lang="ts">
  import son from './components/son.vue'
</script>

<template>
  <son>
    <template #header>
      <h1>我是标题</h1>
    </template>

    <template #default>
      <p>我是内容</p>
    </template>

    <template #footer>
      <p>我是底部</p>
    </template>
  </son>
</template>

// son.vue
<template>
  <div class="root">
    <slot name="header"></slot>
    <slot name="default"></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

react的实现方式

在传递数据的时候是可以传递 jsx 的，我们在传递的时候就直接传递不同的内容，对应进行接收使用

```tsx
const App = () => {
  return (
    <div>
      <h1>父组件</h1>
      <Child header={<h4>头部标题</h4>} body={<p>内容</p>} />
    </div>
  )
}

const Child = ({ header,body }) => {
  return (
    <div>
      <h2>子组件</h2>
      {header}
      <hr />
      {body}
    </div>
  )
}

export default App
```

### 复杂组件之间的数据通讯

```tsx
import { createContext, useContext } from 'react'
//  1. 使用 createContext 创建一个上下文对象
//  2. 定义一个 Provider 组件，用于提供数据,在顶层组件使用
//  3. 在需要使用的地方通过 useContext 获取上下文中提供的对象，在需要使用数据的地方使用
const Context = createContext('')

const App = () => {
  const msg = '父组件的数据'
  return (
    <div>
      <Context.Provider value={ msg }> // 顶层组件提供数据
        父组件
        <Son />
      </Context.Provider>
    </div>
  )
}

const Son = () => {
  return (
    <div>
      子组件
      <Grandson />
    </div>
  )
}

const Grandson = () => {
  return (
    <div>
      孙子组件
      <Lower />
    </div>
  )
}

const Lower = () => {
  const value = useContext(Context)  // 使用 useContext 获取上下文中的数据
  return (
    <div>
      底层组件
      {value}
    </div>
  )
}
export default App

```

### 自定义hook

```tsx
import { useState } from 'react'
// 把可复用的逻辑写在一个自定义的 hook 中，最后返回设定的值和方法，可以以数组或是对象的形式返回
const useToggle = () => {
  const [value, setValue] = useState(false)
  const toggle = () => setValue(!value)
  return [value, toggle]
}

const App = () => {
  // 使用自定义 hook
  // 调用 useToggle 返回的值和方法
  const [value, toggle] = useToggle()
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <div>{value && 'Hello World'}</div>
    </div>
  )
}

export default App
```

### redux

可以理解为vue中的vuex和pinia，进行集中式状态管理

redux toolkit 官方推荐redux逻辑的方式，是一套工具集，简化书写方式

![image-20240726221942857](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/image-20240726221942857.png)

react-redux 用来链接react组件和redux的中间件

![image-20240726222111722](https://cdn.jsdelivr.net/gh/hehuan2023/pic/typora/image-20240726222111722.png)

安装插件

```bash
pnpm i @reduxjs/toolkit react-redux
```



## ReactRouter

安装 react-router-dom 包

```bash
pnpm i react-router-dom
```



```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // 引入路由组件
import  router  from './router' // 引入路由实例

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>   RouterProvider 用来提供路由出口并绑定路由
  </React.StrictMode>
)
```

配置路由信息

```tsx
import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/home'
import Article from '../pages/article'
// 创建路由实例对象
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // element 表示要渲染的组件 ，就是 vue 中的component
  },
  {
    path: '/article',
    element: <Article />,
  },
])
// 导出路由实例对象
export default router
```

### 路由跳转

编程式导航

使用 `useNavigate` 可以理解为 vue 中的 router.push()方法

```tsx
import { Link , useNavigate} from "react-router-dom"

const Home = () => {
   const navigate = useNavigate()
  return (
    <div>
      <Link to={"/article"}>article</Link>
      <h1>home</h1>
      <button onClick={() => navigate('/article')}>去文章页面</button>
    </div>
  )
}
export default Home

```

声明式导航

使用 Link 标签 to 属性后为跳转的路径地址，在实际渲染时会被渲染为 html 的 a 标签

```tsx
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <Link to={"/article"}>article</Link>
      <h1>home</h1>
    </div>
  )
}
export default Home
```



### 路由传参

searchParams传参

```tsx
// 首页
import { useNavigate, Link } from 'react-router-dom'

const home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/article?id=1001&name=react')}>去文章页</button>
    </div>
  )
}

export default home
```



```tsx
// 详情页
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
// 使用了useSearchParams钩子来获取URL中的查询参数。useSearchParams返回一个数组，其中第一个元素是SearchParams对象，第二个元素是一个函数，用于更新查询参数
const Article = () => {
  const [params] = useSearchParams()
  const id = params.get('id') // 通过get方法获取参数
  const name = params.get('name')
  return (
    <div>
      <Link to='/home'>回到首页</Link>
      <h1>article</h1>
      <p>id:{id}--name:{name}</p>
    </div>
  )
}
export default Article
```

params传参

```tsx
// 首页
import { useNavigate, Link } from 'react-router-dom'

const home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/article/1002/react')}>去文章页</button>
    </div>
  )
}

export default home
```

去到路由的位置，加上占位符

```tsx
const router = createBrowserRouter([
    { path: '/article/:id/:tile', element: <Article /> }
])
```



```tsx
// 详情页
import { Link,useParams } from 'react-router-dom'
const Article = () => {
  const params = useParams()
  const id = params.id // params 是通过.语法来获取传递的参数
  const name = params.name
  return (
    <div>
      <Link to='/home'>回到首页</Link>
      <h1>article</h1>
      <p>id:{id}----name:{name}</p>
    </div>
  )
}
export default Article
```

### 嵌套路由

使用children表示对应的二级路由地址

```tsx
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
        path: 'article',
        element: <Article />,
      }
    ]
  },

])
// 导出路由实例对象
export default router
```

在要渲染二级路由的地方，放置 Outlet 标签，和vue中的 view-router 是一个意思

```tsx
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

```

### 默认显示二级路由

去掉二级路由的 path 属性替换为 index：true

```tsx
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

])
// 导出路由实例对象
export default router
```

404 页面配置

```tsx
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
```

#### 路由模式

​	


























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

> 注意：
>
> - jsx不是字符串，不要加引号
> - jsx中的html标签小写开头，React组件为大写开头
> - jsx有且只有一个根标签，必须正确结束
> - 布尔类型、Null 以及 Undefined 将会忽略
> - if语句、Switch语句、变量声明属于语句，不是表达式，不能出现在{ }中

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
function MyButton({ onClick, count }: { onClick: () => void, count: number }) {
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


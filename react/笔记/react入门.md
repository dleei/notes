# react入门

## react是什么?

React 是一个开源的 JavaScript 库，由Facebook开发，主要用于构建用户界面，特别是复杂的单页应用程序(SPA)。它专注于视图层，即用户界面的开发，可以与多种库或框架结合使用，以管理应用程序的状态和数据流动。

![](./assets/react.png)

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

<img src="./assets/%E5%88%9D%E5%A7%8B%E5%8C%96react%E9%A1%B9%E7%9B%AE.png" style="zoom: 50%;" />

cd 切换到创建的文件夹

使用 `npm starrt` 启动项目

<img src="./assets/%E7%AC%AC%E4%B8%80%E4%B8%AAreact%E9%A1%B9%E7%9B%AE.png" style="zoom:50%;" />

### 根目录下的主要文件

- `package.json`：项目配置文件，记录了项目名称、版本、依赖、脚本命令等信息。你可以在这里添加或修改项目依赖、自定义脚本命令等。
- `package-lock.json`：锁定文件，记录了项目依赖的具体版本信息，确保每次安装时能获取到相同版本的依赖，保证项目环境一致性。
- `node_modules/`：存放项目依赖的目录，包含所有通过npm安装的包。这个目录通常比较大，且应被排除在版本控制系统之外。
- `.gitignore`：告诉Git哪些文件或目录不需要被版本控制，比如`node_modules`、`.DS_Store`等。
- `README.md`：项目的自述文件，通常包含项目简介、安装步骤、使用方法等信息。

### src 目录

src (source code) 目录是存放你编写的主要源代码的地方。

- `index.js`：项目的入口文件，负责启动React应用。它导入`ReactDOM.render()`方法来将React组件挂载到DOM的一个指定元素上，通常是`<div id="root"></div>`。
- `index.css`：全局样式文件，可以用来定义整个应用的通用样式。
- `App.js`：默认的主要组件文件，通常作为应用的根组件，包含应用的基本结构和布局。
- `App.test.js`：React应用的测试文件示例，使用Jest和React Testing Library进行单元测试。
- `reportWebVitals.js`：用于报告Web应用的核心健康指标，如首次渲染时间、交互延迟等，帮助优化性能。

### public 目录

public 目录存放公共资源，对用户直接可见。

- `index.html`：项目的HTML模板文件，React应用最终会被渲染到这个文件中的`<div id="root"></div>`元素内。
- `manifest.json`：Web应用清单文件，用于定义Web应用的名称、图标、主题色等元数据，便于PWA（Progressive Web App）的配置。
- `favicon.ico`：网站的收藏夹图标。
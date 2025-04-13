##  框架设计前瞻

### 设计思想及编程范式

#### 命令式和声明式

从范式上来看，视图层框架通常分为命令式和声明式，它们各有优缺点

**命令式**

**概念**

早年间流行的 `jQuery` 就是典型的命令式框架。命令式框架的一大特点就是关注过程。例如，我们把下面这段话翻译成对应的代码

```txt
获取 id 为 app 的 div 标签
它的文本内容为 hello word
为其绑定点击事件
当点击时弹出提示：OK
```

使用原生的 `JavaScript` 对应的代码为

```js
const div = document.querySelector('#app') // 获取 div 

div.innerText = 'hello vue3' // 设置文本内容

div.addEventListener('click', () => { alert('ok') }) // 绑定点击事件
```

完整的叙述了所要经历的全部流程

**编程式**

与命令式框架更加关注过程不同，声明式框架更加关注结果

```vue
<div @click="() => alert('ok')">hello vue3</div>
```

可以看到，我们提供的是一个“结果”，至于如何实现这个“结果”，我们并不关心

**编程式 VS 命令式**

命令式和声明式各有优缺点，在框架设计方面，则体现在**性能** 与**可维护性**之间的权衡

> 声明式代码的性能不优于命令式代码的性能
>

**性能**

假设现在我们要将 div 标签的文本内容修改为 hello vue3，那么如何用命令式代码实现呢？很简单，因为我们明确知道要修改的是什么，所以直接调用相关命令操作即可

```js
div.textContent = 'hello vue3' // 直接修改
```

还有没有其他办法比上面这句代码的性能更好？答案是“没有

理论上命令式代码可以做到极致的性能优化，因为我们明确知道哪些发生了变更，只做必要的修改就行了。但是声明式代码不一定能做到这一点，因为它描述的是结果

```vue
<!-- 之前： --> 
<div @click="() => alert('ok')">hello world</div> 

<!-- 之后： --> 
<div @click="() => alert('ok')">hello vue3</div>
```

为了实现最优的更新性能，它需要找到前后的差异并只更新变化的地方，但是最终完成这次更新的代码仍然是：

```js
div.textContent = 'hello vue3' // 直接修改
```

如果我们把直接修改的性能消耗定义为 A，把找出差异的性能消耗定义为 B，

那么有：

命令式代码的更新性能消耗 = A声明式代码的更新性能消耗 = B + A

声明式代码会比命令式代码多出找出差异的性能消耗，因此最理想的情况是，当找出差异的性能消耗为 0 时，声明式代码与命令式代码的性能相同，但是无法做到超越，毕竟框架本身就是封装了命令式代码才实现了面向用户的声明式。这符合前文中给出的性能结论：声明式代码的性能不优于命令式代码的性能

**可维护性**

Vue选择使用声明式的原因就是声明式代码的可维护性更强

在采用命令式代码开发的时候，我们需要维护实现目标的整个过程，包括要手动完成 DOM 元素的创建、更新、删除等工作

而声明式代码展示的就是我们要的结果，看上去更加直观，至于做事儿的过程，并不需要我们关心，Vue.js都为我们封装好了

#### 编译时

所谓编译时就是在代码构建阶段和组件进行静态分析和转换的过程，在这一阶段会被转化为JavaScript识别执行的代码

假设我们现在设计了一个框架，它提供一个 Render 函数 ，依据提供的树形结构的对象数据，Render 函数会递归的将数据渲染成 浏览器识别的 DOM 元素

```js
const obj = {
   tag: 'div',
    children: [
        { tag: 'span': children: 'hello vue3' }
    ]
}
```

- tag 代表标签名
- children 表示子节点 (children既可以是一个数组也可以是一段文本)

render 函数实现

```js
function Render(obj, root) { 
    const el = document.createElement(obj.tag) 
    if (typeof obj.children === 'string') { 
        const text = document.createTextNode(obj.children) 
        el.appendChild(text)
         } else if (obj.children) { 
            // 数组，递归调用 Render，使用 el 作为 root 参数 
            obj.children.forEach((child) => Render(child, el)) 
        } 
     // 将元素添加到 root 
    root.appendChild(el)
    
}
```

使用函数

```js

const obj = { 
    tag: 'div', 
    children: [ 
        { tag: 'span', children: 'hello world' } 
    ] 
 } 
//渲染到 body 下 
Render(obj, document.body)
```

在使用时直接为 Render 的渲染函数提供了一个树形结构的数据对象，那么就必须按照使用方式的要求传入数据，其他的数据形式并不支持

那么这个 Render 函数就是一个纯运行时的框架

扩展一下引入编译实现，把 html标签编译成树形结构的数据对象

![](D:\Download\notes\vue3\源码\笔记\assets\01.png)*

Compiler

它的作用就是把 HTML 字符串编译成树型结构的数据对象

```js
const html = `
<div>
<span>hello vue3</span>
</div>
`
// 调用 Compiler 得到编译后的树形结构的对象
const obj = Compiler(html)
// 调用 render 进行渲染
Render(obj, document.body)
```

这样就是一个 编译时＋ 运行时 框架的简单实现

它既支持运行时，用户可以直接提供数据对象从而无须编译；又支持编译时，用户可以提供 HTML 字符串，我们将其编译为数据对象后再交给运行时处理

既然编译器可以把 HTML 字符串编译成数据对象，那么能不能直接编译成命令式代码，自然是可以的

![](D:\Download\notes\vue3\源码\笔记\assets\02.png)

这样我们只需要一个 Compiler 函数就可以了，连 Render 都不需要了。其实这就变成了一个纯编译时的框架，因为我们不支持任何运行时内容，用户的代码通过编译器编译后才能运行

#### 运行时

运行时在浏览器**实际执行代码**的阶段，负责处理动态逻辑，如响应式数据更新、组件实例化、虚拟 DOM 的对比（Diff）和 DOM 更新

各自优缺点

运行时的框架由于没有编译的过程，无法分析用户提供的内容，加入编译过程，我们就可以依据用户提供的内容进行分析哪些内容需要改变，哪些内容未来可能需要改变，在编译时提取需要的信息传递给 Render 函数

假如框架是一个纯编译时的，它可以直接分析用户提供的内容，直接将其编译成可执行的 JavaScript 代码，性能会更好，但是有损灵活性，就是用户提供的内容必须时编译后才能运行

其中 Svelte 就是纯编译时的框架，但是它的真实性能可能达不到理论高度。Vue.js 3 仍然保持了运行时 + 编译时的架构，在保持灵活性的基础上能够尽可能地去优化

### 源码下载

[源码](https://github.com/vuejs/core)

所有的核心代码全部在 packages 文件夹里面，使用的是 `monorepo` 进行的依赖管理

![](D:\Download\notes\vue3\源码\笔记\assets\03.png)

<img src="D:\Download\notes\vue3\源码\笔记\assets\04.png" style="zoom:67%;" />

**运行源代码**

Vue使用的是 `pnpm` 作为的包管理工具

```
pnpm i // 下载依赖包
```

```
pnpm build // 对vue源代码进行打包
```

打包后的 js 代码会全部在 packages/vue/dist文件夹内

<img src="D:\Download\notes\vue3\源码\笔记\assets\05.png" style="zoom:80%;" />



**运行测试实例**

 examples文件夹里面的是 vue 官方提供的所有测试实例

在运行实例的时候需要启动一个服务，一个vscode插件 Live-Server 

<img src="D:\Download\notes\vue3\源码\笔记\assets\06.png" style="zoom:67%;" />

运行时右键通过 Live Server 打开

<img src="D:\Download\notes\vue3\源码\笔记\assets\07.gif" style="zoom: 50%;" />

可以看到测试实例正常运行，说明我们打包之后的代码没有任何的问题

### 开启SourceMap

![](D:\Download\notes\vue3\源码\笔记\assets\08.png)

在我们执行 pnpm build 打包操作的时候运行的是 sctipts/build.js 文件

来到 build.js 文件，找到关于 sourcemap 的配置

<img src="D:\Download\notes\vue3\源码\笔记\assets\09.png" style="zoom:80%;" />

这个值是否为 true 表示对应是否开启 sourcemap

回到上方找到这个sourcemap 的值是哪里取到的

![](D:\Download\notes\vue3\源码\笔记\assets\10.png)

可以看到是在values里面取到的，接着找

<img src="D:\Download\notes\vue3\源码\笔记\assets\11.png" style="zoom:70%;" />

是在parseArgs 里面的，找一下

![](D:\Download\notes\vue3\源码\笔记\assets\12.png)

原来是node里面的工具函数，去看一下文档

<img src="D:\Download\notes\vue3\源码\笔记\assets\13.png" style="zoom:47%;" />

简单来说就是`parseArgs` 会将命令行参数（如 `--sourceMap` 或 `-s`）解析为一个结构化对象，分为：

1. **`values`**: 包含所有解析后的选项（`--` 开头的参数）。
2. **`positionals`**: 包含所有位置参数（非选项参数）

如果你执行的是

```bash
node scripts/build.js --sourceMap --formats esm
```

那么被解析后的 values 对象就是

```bash
{
  formats: 'esm',
  sourceMap: true,
  // 其他未显式传递的选项默认为 undefined 或 false
}
```

ok 回到最开始，这个传递进来的 sourcemap 的参数是被 exec 函数处理了

<img src="D:\Download\notes\vue3\源码\笔记\assets\14.png" style="zoom:67%;" />

看一下 exec 函数的定义

<img src="D:\Download\notes\vue3\源码\笔记\assets\15.png" style="zoom:67%;" />

这里就是通过 node 的子进程 执行了rollup 的命令 [ ] 里面是传递给 rollup 对应的一些参数，其中就包括 SourceMap 的配置

<img src="D:\Download\notes\vue3\源码\笔记\assets\16.png" style="zoom:67%;" />

那么我们就可以通过 process.env 访问进程中的变量，从而设置给 rollup 的配置项开启 SourceMap

![](D:\Download\notes\vue3\源码\笔记\assets\17.png)

### 源码debugger

因为我们已经对vue源码开启了sourcemap ，我们重新打包一下

然后新建一个测试实例

```html
// examples/test.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="../../dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const { createApp, ref, onMounted } = Vue

      createApp({
        setup() {
          const title = ref('hello VUE3')
          onMounted(() => {
            document.querySelector('#app').innerHTML = title.value
          })
          return { title }
        },
      }).mount('#app')
    </script>
  </body>
</html>
```

我们在 onMounted 里面加一个断点，测试一下，你也可以选择你自己喜欢的方式在编辑器里面通过`lunch.json`配置调试或是debugger都可以

<img src="D:\Download\notes\vue3\源码\笔记\assets\18.png" style="zoom: 50%;" />

我们在右边可以看到代码对应的执行流程

### 搭建我们自己的vue

#### 初始化

这里我们只实现部分功能主要关注三个部分

- 运行时
- 编译时
- 响应式

```bash
npm init -y
```

![](D:\Download\notes\vue3\源码\笔记\assets\19.png)

#### 配置ts支持

安装

```bash
pnpm i typescript -g

// 查看安装
tsc -v 

// 初始化 ts 配置文件
tsc --init
```

基础配置，这里只是开启配置了一部分

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
     "lib": ["ESNext","DOM"],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "libReplacement": true,                           /* Enable lib replacement. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "NodeNext",                                /* Specify what module code is generated. */
     "rootDir": "./",                                  /* Specify the root folder within your source files. */
     "moduleResolution": "nodenext",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
     "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
     "sourceMap": false,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
     "removeComments": true,                           /* Disable emitting comments. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
     "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
                        
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "erasableSyntaxOnly": true,                       /* Do not allow runtime constructs that are not part of ECMAScript. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
     "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
     "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
     "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  "include": ["packages/*/src"],   
}
```

具体所有详细配置查看[tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 配置详解

![](D:\Download\notes\vue3\源码\笔记\assets\20.png)

这个include 配置项的意思是项目的入口文件

表示匹配 packages 文件夹里面的所有文件的 src 文件夹里面的所有文件

所以需要我们在packages 文件夹里面的每一个模块文件里面都添加一个 src 文件夹，所有的代码都写在 src 文件夹里面 

#### 格式化工具

prettire

```
/** .prettierrc.js
 * 在VSCode中安装prettier插件 打开插件配置填写`.prettierrc.js` 将本文件作为其代码格式化规范
 * 在本文件中修改格式化规则，不会同时触发改变ESLint代码检查，所以每次修改本文件需要重启VSCode，ESLint检查才能同步代码格式化
 * 需要相应的代码格式化规范请自行查阅配置，下面为默认项目配置
 */
module.exports = {
  // plugins: ["prettier-plugin-tailwindcss"],
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: false,
  // 在语句末尾是否需要分号
  semi: true,
  // 是否使用单引号
  singleQuote: false,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: "as-needed",
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: "es5",
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  arrowParens: "always",
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always\never\preserve
  proseWrap: "preserve",
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: "css",
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  //在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
  //然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
  //对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: "auto",
};
```

这里仅作为源码学习，是否需要添加 eslint 检测按照自己的需求即可，这里为了不增加复杂度就不添加

在编辑器中开启在保存时格式化文件

![](D:\Download\notes\vue3\源码\笔记\assets\21.png)

#### 打包工具

vue2和vue3都是用的rollup作为代码打包的工具

配置

```json
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default [
  {
    // 入口文件
    input: 'packages/vue/src/index.ts',
    // 打包出口
    output: [
      {
        // 打包后的文件名
        file: 'packages/vue/dist/vue.js',
        // 打包后的文件格式
        format: 'iife',
        // 打包后的文件是否生成sourceMap
        sourcemap: true,
        // 打包后的文件是否生成全局变量
        name: 'Vue',
      },
    ],
    // 插件
    plugins:[
      typescript({
        sourcemap: true,
      }),
      // 模块导入路径补全
      resolve(),
      // 将commonjs转换为esm
      commonjs()
    ]
  },
]
```

具体所有详情配置项查看文档 [配置](https://www.rollupjs.com/configuration-options/)

插件安装

```bash 
pnpm i @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript tslib typescript -D
```

在 script 里面添加一个打包命令

```json
 "scripts": {
   "build": "rollup -c"
  },
```

![](D:\Download\notes\vue3\源码\笔记\assets\22.png)

检查是否配置有效

我们在 packages/vue/src/index.ts 里面随便写一点代码

```ts
console.log('Hello this is my vue')
```

我们运行打包一下试试

```bash
pnpm build
```

![](D:\Download\notes\vue3\源码\笔记\assets\23.png)

<img src="D:\Download\notes\vue3\源码\笔记\assets\24.png" style="zoom:80%;" />
















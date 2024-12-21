// 函数类型表达式
type Add = (x: number, y: number) => number

// 这里的 addNumber 就是一个函数类型表达式,类型是 Add 是一个函数类型
const addNumber: Add = (a, b) => a + b

// 函数调用签名
// 在JavaScript中函数除了可以被调用, 也是可以有自己的属性的 , 比如 length, name 等等, 但是在TypeScript中函数除了可以被调用, 还可以有自己的类型, 这个类型就是函数调用签名

// 函数调用签名用来描述一个函数如何被调用, 也就是函数的参数列表和返回值类型

// 函数调用签名语法
// (参数列表): 返回值类型

interface AddFunc {
  (x: number, y: number): number
  name: string
  type: string
}


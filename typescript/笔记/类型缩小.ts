// 类型缩小的英文是Type Narrowing (也有人翻译为类型守卫或是类型收窄)
// 类型缩小是指在某个条件下，将一个类型缩小为更具体的类型

// 类型缩小的常见方式有：

// 1. typeof 运算符：通过 typeof 运算符可以判断一个变量的类型，从而缩小类型范围。

const printID = (id: number | string) => {
  if (typeof id === 'string') {
    console.log(id.toUpperCase()) // id 在这里被缩小为 string 类型 , 可以调用 string 类型的方法 , 比如 toUpperCase, toLowerCase, trim 等等
  } else {
    console.log(id++) // id 在这里被缩小为 number 类型 , 可以调用 number 类型的方法
  }
}

// 2. instanceof 运算符：通过 instanceof 运算符可以判断一个变量是否是某个类的实例，从而缩小类型范围。
const printDate = (date: Date | string) => {
  if (date instanceof Date) {
    console.log(date.toISOString()) // date 在这里被缩小为 Date 类型 , 可以调用 Date 类型的方法
  } else {
    console.log(date) // date 在这里被缩小为 string 类型
  }
}
// 3. in 运算符：通过 in 运算符可以判断一个属性是否存在于一个对象中，从而缩小类型范围。

interface Fish {
  swim: () => void
}

interface Bird {
  fly: () => void
}

const move = (animal: Fish | Bird) => {
  if ('swim' in animal) {
    animal.swim() // animal 在这里被缩小为 Fish 类型 , 可以调用 Fish 类型的方法
  } else {
    animal.fly() // animal 在这里被缩小为 Bird 类型 , 可以调用 Bird 类型的方法
  }
}

// 4. 平等缩小 (Equality Narrowing)：通过 === 或 !== 运算符可以缩小类型范围。
// 平等缩小一般是用来判断字面量类型
type Direction = 'left' | 'right' | 'top' | 'bottom'

const switchDirection = (direction: Direction) => {
  switch (direction) {
    case 'left':
      console.log('向左移动')
      break
    case 'right':
      console.log('向右移动')
      break
    case 'top':
      console.log('向上移动')
      break
    case 'bottom':
      console.log('向下移动')
      break
  }
}

// ... 等等

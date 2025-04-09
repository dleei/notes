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
console.log(p.name)
p.sayHello()

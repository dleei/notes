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

export {} 
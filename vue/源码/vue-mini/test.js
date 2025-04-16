const p = {
  firstName: '张',
  lastName: '三',
  get fullName() {
    // get 的作用是可以在读取 fullName 的时候执行函数 p.fullName 而不是 p.fullName()
    return this.firstName + this.lastName
  },
}

const p2 = {
  firstName: '李',
  lastName: '四',
  get fullName() {
    return this.firstName + this.lastName
  },
}

/**
 * Reflect 反射
 *  提供的方法于 Proxy的handler 方法命名相同
 *  主要使用的静态方法有:
 *    Reflect.get(target, key, receiver) 读取属性
 *    Reflect.set(target, key, value, receiver) 设置属性
 *    Reflect.has(target, key) 判断是否有属性
 *    Reflect.deleteProperty(target, key) 删除属性
 * get方法参数
 *    target: 需要取值的目标对象
 *    key: 需要获取的值的键值
 *    receiver: 可选, 如果target对象中指定了getter，receiver则为 getter 调用时的this值
 *    返回值: 读取的属性值
 * set 方法参数
 *    target: 需要设置的目标对象
 *    key: 设置的属性的名称
 *    value: 需要设置的值
 *    receiver: 可选, 如果target对象中指定了setter，receiver则为 setter 调用时的this值
 *    返回值: 一个布尔值, 表示是否设置成功
 */

console.log(Reflect.get(p, 'fullName')) // 张三
console.log(Reflect.get(p2, 'fullName', p2)) // 李四

Reflect.set(p, 'firstName', '王')

console.log(p.fullName) // 王三
 
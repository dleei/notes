const Log: MethodDecorator = (target, propertyKey, descriptor) => {
  console.log(target)
  console.log(propertyKey)
  console.log(descriptor)
}

class User {
  @Log
  getName() {
    return 'Tom'
  }
}

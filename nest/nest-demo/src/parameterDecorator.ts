const Param: ParameterDecorator = (target, propertyKey, parameterIndex) => {
  console.log(target) 
  console.log(propertyKey) 
  console.log(parameterIndex) 
}

class User {
  getName(@Param name: string) {
    return name
  }
}

export {}

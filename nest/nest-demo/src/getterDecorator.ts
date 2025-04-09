// 参数装饰器
function parameterDecorator(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`参数装饰器: ${propertyKey} 的第 ${parameterIndex} 个参数`);
}

// 方法装饰器
function methodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`方法装饰器: ${propertyKey}`);
}

// 属性装饰器
function propertyDecorator(target: any, propertyKey: string) {
  console.log(`属性装饰器: ${propertyKey}`);
}

// 访问器装饰器
function accessorDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`访问器装饰器: ${propertyKey}`);
}

// 类装饰器
function classDecorator(constructor: Function) {
  console.log('类装饰器');
}

@classDecorator
class ExampleClass {
  @propertyDecorator
  public property: string;

  @accessorDecorator
  get accessor() {
      return this.property;
  }

  @methodDecorator
  public method(@parameterDecorator param1: number, @parameterDecorator param2: string) {
      // 方法体
  }
}

const example = new ExampleClass();

export {}

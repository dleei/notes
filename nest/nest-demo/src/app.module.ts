import { AppController } from './app.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AppController],
})
export class AppModule {
    constructor() { }
}

/**
 * 1. @Module 装饰器：用于定义一个模块，接受一个对象作为参数，其中包含了模块的元数据。
 *  模块是组织代码的基本单元，它包含了一组相关的组件、服务和提供者组织在一起。
 *  Nest 模块是受 Angular 模块的启发
 */
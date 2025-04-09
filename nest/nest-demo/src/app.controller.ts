import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor() { }
    
    @Get()
    // 定义一个异步方法 getHello，返回一个字符串 "Hello World!"，用于测试应用程序是否正常运行
    async getHello():Promise<string> {
        return "Hello World!";
    }
} 

/**
 * 
 * @ Controller 装饰器：用于定义一个控制器类，接受一个字符串作为参数，用于指定控制器的路由路径。控制器类是处理 HTTP 请求的类，它包含了一组处理 HTTP 请求的方法。
 * 在控制器内部会使用 路由装饰器 如 @Get、@Post、@Put、@Delete 等来定义处理不同 HTTP 请求的方法。
 * 
 * @ Get 装饰器：用于将控制器的方法（getHello)映射到本地的 http 的 get 请求。
 */
// swagger.config.js
const swaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CodeHub API 文档',
      version: '1.0.0',
      description: 'CodeHub 接口文档',
    },
    servers: [{ url: 'http://localhost:8080/swagger' }],
  },
  // 指向 router 目录下的所有 .router.js 文件
  apis: ['./src/router/*.router.js'], 
};

export default swaggerConfig;
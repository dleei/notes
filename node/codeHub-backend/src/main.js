import chalk from 'chalk';
import figlet from 'figlet';
import { SERVER_PORT } from './config/index.js';
import app from './app/index.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerConfig from '../swagger.config.js'; 
import { koaBody } from 'koa-body';
import './utils/handle-error.js';
import registerRoutes from './router/index.js';

// 生成 Swagger 文档配置
const specs = swaggerJSDoc(swaggerConfig);

// 注册 Swagger 中间件
app.use(
  koaSwagger({
    routePrefix: '/swagger', // 访问路径
    swaggerOptions: {
      url: '/swagger.json', // 配置 Swagger 文档的加载地址
    },
  })
);

// 提供 Swagger JSON
app.use(async (ctx, next) => {
  if (ctx.path === '/swagger.json') {
    ctx.body = specs;
  }
  await next();
});

// 注册路由
app.use(koaBody());
registerRoutes(app);


app.listen(SERVER_PORT, () => {
  console.log(
    chalk.hex('#F2F2F2').bold(
      figlet.textSync('CodeHub', {
        font: 'Standard',
        horizontalLayout: 'full',
        verticalLayout: 'default'
      })
    )
  );
  console.log(
    chalk.bold.hex('#CC2E67')(`\nServer is running on http://localhost:${SERVER_PORT} 🚀\n`)
  );
});

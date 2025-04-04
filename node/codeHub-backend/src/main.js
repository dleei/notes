import chalk from 'chalk';
import figlet from 'figlet';
import { SERVER_PORT } from './config/index.js';
import app from './app/index.js';

import { koaBody } from 'koa-body';

import './utils/handle-error.js'
import registerRoutes from './router/index.js'

app.use(koaBody());

registerRoutes(app)
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(loginRouter.routes());
// app.use(loginRouter.allowedMethods());
// app.use(registerRouter.routes());
// app.use(registerRouter.allowedMethods());

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

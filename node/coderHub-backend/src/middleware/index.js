import app from '../main.js'
import userRouter from '../router/user.router.js'

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

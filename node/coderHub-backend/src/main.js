import chalk from 'chalk'
import { SERVER_PORT} from './config/index.js'
import app from './app/index.js'

app.listen(SERVER_PORT, () => {
  console.log(chalk.green(`Server is running on port ${SERVER_PORT}`))
})

import dotenv from 'dotenv'
import process from 'process'

dotenv.config()

export const { SERVER_PORT,DATABASE_HOST,DATABASE_PORT,DATABASE_NAME,DATABASE_USER,DATABASE_PASSWORD,CONNECTION_LIMIT,SECRET_KEY } = process.env

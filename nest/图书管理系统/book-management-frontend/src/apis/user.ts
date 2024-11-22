import request from '../utils/request'
import type { RegisterUser } from '../../types/user'

export const toRegister = (data: RegisterUser) => {
  request.post('/user/register', 
    data,
  )
}

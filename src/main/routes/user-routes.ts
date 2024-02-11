import { adaptController } from '@/main/adapters'
import {
  CreateUserController,
  DeleteUserController,
  GetUserController,
  ListUserController,
  UpdateUserController,
} from '@/presentation/controllers'

import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/user', adaptController(ListUserController.name))
  router.get('/user/:id', adaptController(GetUserController.name))
  router.post('/user', adaptController(CreateUserController.name))
  router.put('/user/:id', adaptController(UpdateUserController.name))
  router.delete('/user/:id', adaptController(DeleteUserController.name))
}

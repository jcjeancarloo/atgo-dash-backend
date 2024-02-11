import { container } from 'tsyringe'

import {
  CreateUserController,
  DeleteUserController,
  GetUserController,
  ListUserController,
  UpdateUserController,
} from '@/presentation/controllers'

container.register<ListUserController>('ListUserController', {
  useClass: ListUserController,
})
container.register<GetUserController>('GetUserController', {
  useClass: GetUserController,
})
container.register<CreateUserController>('CreateUserController', {
  useClass: CreateUserController,
})
container.register<UpdateUserController>('UpdateUserController', {
  useClass: UpdateUserController,
})
container.register<DeleteUserController>('DeleteUserController', {
  useClass: DeleteUserController,
})

export default container

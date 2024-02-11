import { container } from 'tsyringe'

import {
  CreateUserService,
  DeleteUserService,
  GetUserService,
  ListUserService,
  UpdateUserService,
} from '@/app/services/user'

import { UserRepository } from '@/app/protocols/db/repositories/user'

import {
  CreateUserUsecase,
  DeleteUserUsecase,
  GetUserUsecase,
  ListUserUsecase,
  UpdateUserUsecase,
} from '@/domain/usecases/users'

import { UserPrismaRepository } from '@/infra/db/prisma/repositories/user-prisma-repository'

container.register<CreateUserUsecase>('CreateUserUsecase', {
  useClass: CreateUserService,
})
container.register<ListUserUsecase>('ListUserUsecase', {
  useClass: ListUserService,
})
container.register<GetUserUsecase>('GetUserUsecase', {
  useClass: GetUserService,
})
container.register<UpdateUserUsecase>('UpdateUserUsecase', {
  useClass: UpdateUserService,
})
container.register<DeleteUserUsecase>('DeleteUserUsecase', {
  useClass: DeleteUserService,
})

container.register<UserRepository>('UserRepository', {
  useClass: UserPrismaRepository,
})

export default container

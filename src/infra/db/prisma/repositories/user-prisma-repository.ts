import * as UserRepository from '@/app/protocols/db/repositories/user'
import { dbHelper } from '../database-helper'
export class UserPrismaRepository implements UserRepository.UserRepository {
  private prisma = dbHelper.client
  async list(params: UserRepository.List.Params): Promise<UserRepository.List.Result> {
    return await this.prisma.user.findMany({})
  }

  async get(params: UserRepository.Get.Params): Promise<UserRepository.Get.Result> {
    return await this.prisma.user.findUnique({
      where: params,
    })
  }

  async getByEmail(
    params: UserRepository.GetByEmail.Params,
  ): Promise<UserRepository.GetByEmail.Result> {
    return await this.prisma.user.findFirst({
      where: params,
      include: {
        company: true,
      },
    })
  }

  async create(params: UserRepository.Create.Params): Promise<UserRepository.Create.Result> {
    return await this.prisma.user.create({
      data: params,
    })
  }

  async update(params: UserRepository.Update.Params): Promise<UserRepository.Update.Result> {
    return await this.prisma.user.update({ where: { id: params.id }, data: params })
  }

  async delete(params: UserRepository.Delete.Params): Promise<UserRepository.Delete.Result> {
    await this.prisma.user.update({
      where: params,
      data: {
        isActive: false,
      },
    })
  }
}

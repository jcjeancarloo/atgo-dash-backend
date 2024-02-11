import * as PlatformRepository from '@/app/protocols/db/repositories/platform'
import { dbHelper } from '../database-helper'
export class PlatformPrismaRepository implements PlatformRepository.PlatformRepository {
  private prisma = dbHelper.client
  async list(params: PlatformRepository.List.Params): Promise<PlatformRepository.List.Result> {
    return await this.prisma.platform.findMany({})
  }

  async get(params: PlatformRepository.Get.Params): Promise<PlatformRepository.Get.Result> {
    return await this.prisma.platform.findUnique({
      where: params,
    })
  }

  async create(
    params: PlatformRepository.Create.Params,
  ): Promise<PlatformRepository.Create.Result> {
    return await this.prisma.platform.create({
      data: params,
    })
  }

  async update(
    params: PlatformRepository.Update.Params,
  ): Promise<PlatformRepository.Update.Result> {
    return await this.prisma.platform.update({ where: { id: params.id }, data: params })
  }

  async delete(
    params: PlatformRepository.Delete.Params,
  ): Promise<PlatformRepository.Delete.Result> {
    await this.prisma.platform.update({
      where: params,
      data: {
        isActive: false,
      },
    })
  }
}

import * as IntegrationRepository from '@/app/protocols/db/repositories/integration'
import { dbHelper } from '../database-helper'
export class IntegrationPrismaRepository implements IntegrationRepository.IntegrationRepository {
  private prisma = dbHelper.client
  async list(
    params: IntegrationRepository.List.Params,
  ): Promise<IntegrationRepository.List.Result> {
    return await this.prisma.integration.findMany({})
  }

  async get(params: IntegrationRepository.Get.Params): Promise<IntegrationRepository.Get.Result> {
    return await this.prisma.integration.findUnique({
      where: params,
    })
  }

  async create(
    params: IntegrationRepository.Create.Params,
  ): Promise<IntegrationRepository.Create.Result> {
    return await this.prisma.integration.create({
      data: params,
    })
  }

  async update(
    params: IntegrationRepository.Update.Params,
  ): Promise<IntegrationRepository.Update.Result> {
    return await this.prisma.integration.update({ where: { id: params.id }, data: params })
  }

  async delete(
    params: IntegrationRepository.Delete.Params,
  ): Promise<IntegrationRepository.Delete.Result> {
    await this.prisma.integration.update({
      where: params,
      data: {
        isActive: false,
      },
    })
  }
}

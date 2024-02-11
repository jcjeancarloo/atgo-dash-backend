import * as CompanyRepository from '@/app/protocols/db/repositories/companies'
import { excludeAttribute } from '@/utils'
import { dbHelper } from '../database-helper'
export class CompanyPrismaRepository implements CompanyRepository.CompanyRepository {
  private prisma = dbHelper.client
  async list(params: CompanyRepository.List.Params): Promise<CompanyRepository.List.Result> {
    return await this.prisma.company.findMany({})
  }

  async get(params: CompanyRepository.Get.Params): Promise<CompanyRepository.Get.Result> {
    const company = await this.prisma.company.findUnique({
      where: params,
      include: {
        integration: true,
      },
    })
    if (!company) return null

    const formatted = {
      ...excludeAttribute(company, ['integration']),
      integration: company.integration[0],
    }

    return formatted as CompanyRepository.Get.Result
  }

  async create(params: CompanyRepository.Create.Params): Promise<CompanyRepository.Create.Result> {
    return await this.prisma.company.create({
      data: params,
    })
  }

  async update(params: CompanyRepository.Update.Params): Promise<CompanyRepository.Update.Result> {
    return await this.prisma.company.update({ where: { id: params.id }, data: params })
  }

  async delete(params: CompanyRepository.Delete.Params): Promise<CompanyRepository.Delete.Result> {
    await this.prisma.company.update({
      where: params,
      data: {
        isActive: false,
      },
    })
  }
}

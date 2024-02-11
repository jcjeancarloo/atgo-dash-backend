import { User } from '@prisma/client'

export namespace LoginUsecase {
  export const name = 'LoginUsecase'

  export type Params = {
    email: string
    password: string
  }

  export type Result = Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'companyId'> & {
    access_token: string
    company: {
      id: string
      name: string
      document: string
      description?: string
      website?: string
      isActive: boolean
    }
  }
}

export interface LoginUsecase {
  perform: (params: LoginUsecase.Params) => Promise<LoginUsecase.Result>
}

import { Company } from '@prisma/client'

export namespace Create {
  export type Params = Company

  export type Result = Company
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}

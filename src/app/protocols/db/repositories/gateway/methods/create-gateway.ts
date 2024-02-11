import { Gateway } from '@prisma/client'

export namespace Create {
  export type Params = Gateway

  export type Result = Gateway
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}

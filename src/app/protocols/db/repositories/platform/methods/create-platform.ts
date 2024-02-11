import { Platform } from '@prisma/client'

export namespace Create {
  export type Params = Platform

  export type Result = Platform
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}

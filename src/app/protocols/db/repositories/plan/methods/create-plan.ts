import { Plan } from '@prisma/client'

export namespace Create {
  export type Params = Plan

  export type Result = Plan
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}

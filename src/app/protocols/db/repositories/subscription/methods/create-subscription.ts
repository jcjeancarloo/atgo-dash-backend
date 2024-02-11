import { Subscription } from '@prisma/client'

export namespace Create {
  export type Params = Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>

  export type Result = Subscription
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}

import { User } from '@prisma/client'

export namespace Create {
  export type Params = User

  export type Result = User
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}

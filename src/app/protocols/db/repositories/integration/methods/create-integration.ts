import { Integration } from '@prisma/client'

export namespace Create {
  export type Params = Integration

  export type Result = Integration
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}

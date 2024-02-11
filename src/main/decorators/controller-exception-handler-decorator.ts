import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

export class ControllerExceptionHandlerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return this.controller.handle(httpRequest)
    } catch (error: any) {
      throw error
    }
  }
}

import { type Request, type Response, type NextFunction } from 'express'
import { type Middleware } from '@/presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const { statusCode, body, locals } = await middleware.handle({
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      locals: res.locals,
    })
    if (locals !== undefined) {
      res.locals = Object.assign(res.locals, locals)
    }
    if (statusCode !== 0) {
      return res.status(statusCode).json(body)
    }

    next()
  }
}

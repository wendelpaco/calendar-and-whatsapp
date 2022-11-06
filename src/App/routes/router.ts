import { Application } from 'express'

import { v1User } from './index'

export class Routers {
  public UseRoutes(app: Application): void {
    app.use('/v1', v1User)
  }
}

import type { Express } from 'express'
import appCheckRoutes from './appCheck.routes'
import userRoutes from './user.routes'
import categoryRoutes from './category.routes'

export const appRouterV1 = (app: Express): void => {
  app.use('/api/v1', appCheckRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/categories', categoryRoutes)
}

import type { Express } from 'express'
import appCheckRoutes from './appCheck.routes'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import deviceRoutes from './device.routes'
import myProfileRoutes from './myProfile.routes'
import statisticRoutes from './statistic.routes'
import locationRoutes from './location.routes'

export const appRouterV1 = (app: Express): void => {
  app.use('/api/v1', appCheckRoutes)
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/devices', deviceRoutes)
  app.use('/api/v1/my-profiles', myProfileRoutes)
  app.use('/api/v1/statistic', statisticRoutes)
  app.use('/api/v1/locations', locationRoutes)
}

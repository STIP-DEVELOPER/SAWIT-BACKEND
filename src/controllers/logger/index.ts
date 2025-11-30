import { createLogger } from './create'
import { findAllLogger } from './findAll'

export const loggerController = {
  findAll: findAllLogger,
  create: createLogger
}

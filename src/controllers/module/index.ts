import { createModule } from './create'
import { findAllModule } from './findAll'
import { findDetailModule } from './findDetail'
import { removeModule } from './remove'
import { updateModule } from './update'

export const moduleController = {
  findAll: findAllModule,
  findByDetail: findDetailModule,
  create: createModule,
  remove: removeModule,
  update: updateModule
}

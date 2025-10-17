import { createDevice } from './create'
import { findAllDevice } from './findAll'
import { findDetailDevice } from './findDetail'
import { removeDevice } from './remove'
import { updateDevice } from './update'

export const deviceController = {
  findAll: findAllDevice,
  findByDetail: findDetailDevice,
  create: createDevice,
  remove: removeDevice,
  update: updateDevice
}

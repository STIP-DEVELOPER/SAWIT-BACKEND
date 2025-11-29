import { createLocation } from './create'
import { findAllLocation } from './findAll'
import { findDetailLocation } from './findDetail'

export const locationController = {
  findAll: findAllLocation,
  findDetail: findDetailLocation,
  create: createLocation
}

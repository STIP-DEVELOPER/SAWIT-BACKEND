import { createLocation } from './create'
import { findAllLocation } from './findAll'
import { findDetailLocation } from './findDetail'
import { getAllDeviceLatestLocations } from './gerLatestLocation'

export const locationController = {
  findAll: findAllLocation,
  findDetail: findDetailLocation,
  getAllLatestLocations: getAllDeviceLatestLocations,
  create: createLocation
}

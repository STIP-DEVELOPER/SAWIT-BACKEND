import { useAuthorization } from './access'
import { requestTimer } from './requestTimer'
import { allowRoles } from './roleGuard'

export const middleware = { useAuthorization, requestTimer, allowRoles }

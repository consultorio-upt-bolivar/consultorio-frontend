import { Roles } from '../_api'

export interface RoutesConfig {
  path?: string
  component?: any;
  id: string
  exact?: boolean
  routes?: RoutesConfig[]
  requiredRoles?: Roles[]
}

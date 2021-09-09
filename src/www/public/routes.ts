import { RoutesConfig } from '../../common/interfaces/routesConfig.interface'
import { HomePage } from './pages/home/home'

export const PublicRoutes: RoutesConfig[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    id: 'home',
  },
]

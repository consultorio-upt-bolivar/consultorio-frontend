import { RoutesConfig } from '../../common/interfaces/routesConfig.interface'
import { LoginPage } from './pages/login/login'
import { SigninPage } from './pages/signin/signin'

export const AuthRoutes: RoutesConfig[] = [
  {
    path: '/login',
    component: LoginPage,
    exact: true,
    id: 'login',
  },
  {
    path: '/signin',
    component: SigninPage,
    exact: true,
    id: 'signin',
  },
]

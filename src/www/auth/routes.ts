import { RoutesConfig } from '../../interfaces/routesConfig.interface'
import { ForgotPasswordPage } from './pages/forgotPassword/forgotPassword'
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
  {
    path: '/forgot-password',
    component: ForgotPasswordPage,
    exact: true,
    id: 'forgot-password',
  },
]

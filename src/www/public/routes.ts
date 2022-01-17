import { RoutesConfig } from '../../interfaces/routesConfig.interface'
import { Roles } from '../../_api'
import { HomePage } from './pages/home'
import { SpecialistDashboardPage } from './pages/specialist-dashboard'
import { UserDashboardPage } from './pages/user-dashboard'
import { UserProfilePage } from './pages/user-profile'

export const PublicRoutes: RoutesConfig[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    id: 'home',
  },
]

export const UserRoutes: RoutesConfig[] = [
  {
    path: '/profile',
    component: UserProfilePage,
    exact: true,
    id: 'user-profile',
    requiredRoles: [Roles.Student, Roles.Employee, Roles.Family, Roles.MedicalSpecialist]
  },
  {
    path: '/dashboard',
    component: UserDashboardPage,
    exact: true,
    id: 'user-dashboard',
    requiredRoles: [Roles.Student, Roles.Employee, Roles.Family, Roles.MedicalSpecialist]
  },
  {
    path: '/especialista-dashboard',
    component: SpecialistDashboardPage,
    exact: true,
    id: 'specialist-dashboard',
    requiredRoles: [Roles.MedicalSpecialist]
  },
]

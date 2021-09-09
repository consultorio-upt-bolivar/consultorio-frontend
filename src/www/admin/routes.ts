import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { RoutesConfig } from '../../common/interfaces/routesConfig.interface'
import { Roles } from '../../_api'
import { DashboardPage } from './pages/dashboard/dashboard'
import { CreateMedicalAppointmentPage } from './pages/medicalAppointments/create'
import { ListMedicalAppointmentsPage } from './pages/medicalAppointments/list'
import { CreateModalPage } from './pages/modals/create'
import { ListModalPage } from './pages/modals/list'

export interface SidebarConfig {
  path: string
  id: string
  icon: OverridableComponent<any>
  text: string
  submenu?: SidebarConfig[]
}

export const AdminSidebar: SidebarConfig[] = [
  {
    path: '/admin',
    icon: InboxIcon,
    id: 'dashboard',
    text: 'Dashboard',
  },
  {
    path: '/admin/citas-medicas',
    icon: InboxIcon,
    text: 'Citas medicas',
    id: 'citas-medicas',
    submenu: [
      {
        path: '/admin/citas-medicas',
        text: 'Listado',
        id: 'listado-citas-medicas',
        icon: InboxIcon,
      },
      {
        path: '/admin/citas-medicas/crear',
        text: 'Crear Cita',
        id: 'crear-citas-medicas',
        icon: InboxIcon,
      },
    ],
  },
  {
    path: '/admin/modales',
    icon: InboxIcon,
    text: 'Modales',
    id: 'modales',
    submenu: [
      {
        path: '/admin/modales',
        text: 'Listado',
        id: 'listado-modales',
        icon: InboxIcon,
      },
      {
        path: '/admin/modales/crear',
        text: 'Crear Modal',
        id: 'crear-modales',
        icon: InboxIcon,
      },
    ],
  },
]

export const AdminRoutes: RoutesConfig[] = [
  {
    path: '/admin',
    component: DashboardPage,
    exact: true,
    id: 'dashboard',
    requiredRoles: [Roles.Admin, Roles.Admin2],
  },
  // Citas Medicas
  {
    path: '/admin/citas-medicas',
    component: ListMedicalAppointmentsPage,
    exact: true,
    id: 'listado-citas-medicas',
    requiredRoles: [Roles.Admin, Roles.Admin2],
  },
  {
    path: '/admin/citas-medicas/crear',
    component: CreateMedicalAppointmentPage,
    exact: true,
    id: 'crear-citas-medicas',
    requiredRoles: [Roles.Admin, Roles.Admin2],
  },
  {
    path: '/admin/citas-medicas/:id',
    component: CreateMedicalAppointmentPage,
    id: 'actualizar-citas-medicas',
    requiredRoles: [Roles.Admin, Roles.Admin2],
  },
  //Modales
  {
    path: '/admin/modales',
    component: ListModalPage,
    exact: true,
    id: 'listado-modales',
    requiredRoles: [Roles.Admin, Roles.Admin2],
  },
  {
    path: '/admin/modales/crear',
    component: CreateModalPage,
    exact: true,
    id: 'crear-modales',
    requiredRoles: [Roles.Admin, Roles.Admin2],
  },
  {
    path: '/admin/modales/:id',
    component: CreateModalPage,
    id: 'actualizar-modales',
    requiredRoles: [Roles.Admin, Roles.Admin2],
  },
]

import { AddBoxOutlined, ClassOutlined, DashboardOutlined, DesktopWindowsOutlined, FavoriteBorderOutlined, GroupAddOutlined, HomeWorkOutlined, LocalHospital, ReorderOutlined, Schedule, Security } from '@material-ui/icons'
import { RoutesConfig } from '../../interfaces/routesConfig.interface'
import { Roles } from '../../_api'
import { DashboardPage } from './pages/dashboard/dashboard'
import { UpdateMedicalAppointmentPage } from './pages/medicalAppointments/update'
import { ListMedicalAppointmentsPage } from './pages/medicalAppointments/list'
import { CreateModalPage } from './pages/modals/create'
import { ListModalPage } from './pages/modals/list'
import { CreateOfficePage } from './pages/offices/create'
import { ListOfficesPage } from './pages/offices/list'
import { CreateSchedulesPage } from './pages/schedules/create'
import { ListSchedulesPage } from './pages/schedules/list'
import { CreateSpecialistPage } from './pages/specialists/create'
import { ListSpecialistsPage } from './pages/specialists/list'
import { CreateSpecialitiesPage } from './pages/specialities/create'
import { ListSpecialitiesPage } from './pages/specialities/list'
import { CreateUsersPage } from './pages/users/create'
import { ListUsersPage } from './pages/users/list'
import { ProfileAdminPage } from './pages/profile-admin'
import { CreateMedicalAppointmentPage } from './pages/medicalAppointments/create'
import { DatabasesPage } from './pages/databases'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface SidebarConfig {
  path: string
  id: string
  icon: OverridableComponent<any>
  text: string
  requiredRoles?: string[],
  submenu?: SidebarConfig[]
}

export const AdminSidebar: SidebarConfig[] = [
  {
    path: '/admin',
    icon: DashboardOutlined,
    id: 'dashboard',
    text: 'Dashboard',
    requiredRoles: [Roles.MedicalSpecialist]
  },
  {
    path: '/admin/modales',
    icon: DesktopWindowsOutlined,
    text: 'Modales',
    id: 'modales',
    submenu: [
      {
        path: '/admin/modales',
        text: 'Listado',
        id: 'listado-modales',
        icon: ReorderOutlined,
      },
      {
        path: '/admin/modales/crear',
        text: 'Nuevo Modal',
        id: 'crear-modales',
        icon: AddBoxOutlined,
      },
    ],
  },
  {
    path: '/admin/usuarios',
    icon: GroupAddOutlined,
    text: 'Usuarios',
    id: 'usuarios',
    submenu: [
      {
        path: '/admin/usuarios',
        text: 'Listado',
        id: 'listado-usuarios',
        icon: ReorderOutlined
      },
      {
        path: '/admin/usuarios/crear',
        text: 'Nuevo usuario',
        id: 'crear-usuario',
        icon: AddBoxOutlined,
      },
    ],
  },
  {
    path: '/admin/especialistas',
    icon: FavoriteBorderOutlined,
    text: 'Especialistas',
    id: 'especialistas',
    submenu: [
      {
        path: '/admin/especialistas',
        text: 'Listado',
        id: 'listado-especialistas',
        icon: ReorderOutlined,
      },
      {
        path: '/admin/especialistas/crear',
        text: 'Nuevo especialista',
        id: 'crear-especialista',
        icon: AddBoxOutlined,
      },
    ],
  },
  {
    path: '/admin/oficinas',
    icon: HomeWorkOutlined,
    text: 'Oficinas',
    id: 'oficinas',
    submenu: [
      {
        path: '/admin/oficinas',
        text: 'Listado',
        id: 'listado-oficinas',
        icon: ReorderOutlined,
      },
      {
        path: '/admin/oficinas/crear',
        text: 'Nuevo consultorio',
        id: 'crear-oficina',
        icon: AddBoxOutlined,
      },
    ],
  },
  {
    path: '/admin/especialidades',
    icon: ClassOutlined,
    text: 'Especialidades',
    id: 'especialidades',
    submenu: [
      {
        path: '/admin/especialidades',
        text: 'Listado',
        id: 'listado-especialidades',
        icon: ReorderOutlined,
      },
      {
        path: '/admin/especialidades/crear',
        text: 'Nueva especialidad',
        id: 'crear-especialidad',
        icon: AddBoxOutlined,
      },
    ],
  },
  {
    path: '/admin/jornadas',
    icon: Schedule,
    text: 'Jornadas',
    id: 'jornadas',
    submenu: [
      {
        path: '/admin/jornadas',
        text: 'Listado',
        id: 'listado-jornadas',
        icon: ReorderOutlined,
      },
      {
        path: '/admin/jornadas/crear',
        text: 'Nueva jornada médica',
        id: 'crear-jornada',
        icon: AddBoxOutlined,
      },
    ],
  },
  {
    path: '/admin/citas-medicas',
    icon: LocalHospital,
    text: 'Citas medicas',
    id: 'citas-medicas',
    requiredRoles: [Roles.MedicalSpecialist, Roles.MedicalSpecialist, Roles.Student, Roles.Employee, Roles.Family],
    submenu: [
      {
        path: '/admin/citas-medicas',
        text: 'Listado',
        id: 'listado-citas-medicas',
        icon: ReorderOutlined,
        requiredRoles: [Roles.MedicalSpecialist, Roles.MedicalSpecialist, Roles.Student, Roles.Employee, Roles.Family],
      },
      {
        path: '/admin/citas-medicas/solicitar',
        text: 'Solicitar',
        id: 'solicitar-citas-medicas',
        icon: AddBoxOutlined,
        requiredRoles: [Roles.MedicalSpecialist, Roles.MedicalSpecialist, Roles.Student, Roles.Employee, Roles.Family],
      },
    ],
  },
  {
    path: '/admin/base-de-datos',
    icon: Security,
    text: 'Base de datos',
    id: 'base-de-datos'
  },
]

export const AdminRoutes: RoutesConfig[] = [
  {
    path: '/admin',
    component: DashboardPage,
    exact: true,
    id: 'dashboard',
    requiredRoles: [Roles.MedicalSpecialist],
  },
  // Profile
  {
    path: '/admin/profile',
    component: ProfileAdminPage,
    exact: true,
    id: 'profilePage',
    requiredRoles: [Roles.MedicalSpecialist],
  },
  // Citas Medicas
  {
    path: '/admin/citas-medicas',
    component: ListMedicalAppointmentsPage,
    exact: true,
    id: 'listado-citas-medicas',
    requiredRoles: [Roles.MedicalSpecialist],
  },
  {
    path: '/admin/citas-medicas/solicitar',
    component: CreateMedicalAppointmentPage,
    id: 'solicitar-citas-medica',
    requiredRoles: [Roles.MedicalSpecialist],
  },
  {
    path: '/admin/citas-medicas/:id',
    component: UpdateMedicalAppointmentPage,
    id: 'actualizar-citas-medicas',
    requiredRoles: [Roles.MedicalSpecialist],
  },
  //Modales
  {
    path: '/admin/modales',
    component: ListModalPage,
    exact: true,
    id: 'listado-modales'
  },
  {
    path: '/admin/modales/crear',
    component: CreateModalPage,
    exact: true,
    id: 'crear-modales'
  },
  {
    path: '/admin/modales/:id',
    component: CreateModalPage,
    id: 'actualizar-modales'
  },
  // Users
  {
    path: '/admin/usuarios',
    component: ListUsersPage,
    exact: true,
    id: 'listado-usuarios'
  },
  {
    path: '/admin/usuarios/crear',
    component: CreateUsersPage,
    exact: true,
    id: 'crear-usuarios'
  },
  {
    path: '/admin/usuarios/:id',
    component: CreateUsersPage,
    id: 'actualizar-usuarios'
  },
  // Specialists
  {
    path: '/admin/especialistas',
    component: ListSpecialistsPage,
    exact: true,
    id: 'listado-especialistas'
  },
  {
    path: '/admin/especialistas/crear',
    component: CreateSpecialistPage,
    exact: true,
    id: 'crear-especialistas'
  },
  {
    path: '/admin/especialistas/:id',
    component: CreateSpecialistPage,
    id: 'actualizar-especialistas'
  },
  // Offices
  {
    path: '/admin/oficinas',
    component: ListOfficesPage,
    exact: true,
    id: 'listado-oficinas'
  },
  {
    path: '/admin/oficinas/crear',
    component: CreateOfficePage,
    exact: true,
    id: 'crear-oficinas'
  },
  {
    path: '/admin/oficinas/:id',
    component: CreateOfficePage,
    id: 'actualizar-oficinas'
  },
  // Specialities
  {
    path: '/admin/especialidades',
    component: ListSpecialitiesPage,
    exact: true,
    id: 'listado-especialidades'
  },
  {
    path: '/admin/especialidades/crear',
    component: CreateSpecialitiesPage,
    exact: true,
    id: 'crear-especialidades'
  },
  {
    path: '/admin/especialidades/:id',
    component: CreateSpecialitiesPage,
    id: 'actualizar-especialidades'
  },
  // Schedules
  {
    path: '/admin/jornadas',
    component: ListSchedulesPage,
    exact: true,
    id: 'listado-jornadas'
  },
  {
    path: '/admin/jornadas/crear',
    component: CreateSchedulesPage,
    exact: true,
    id: 'crear-jornadas'
  },
  {
    path: '/admin/jornadas/:id',
    component: CreateSchedulesPage,
    id: 'actualizar-jornadas'
  },
  // Databases
  {
    path: '/admin/base-de-datos',
    component: DatabasesPage,
    id: 'base-de-datos'
  },
]

/* prettier-ignore-start */
export enum Roles {
  Student = 'student',
  Employee = 'employee',
  Family = 'family',
}

export const PublicRolesApi: {
  [name: string]: string
} = {
  estudiante: 'student',
  administrativo: 'employee',
  familiar: 'family',
}

export const PublicRoles = ['Estudiante', 'Administrativo', 'Familiar']

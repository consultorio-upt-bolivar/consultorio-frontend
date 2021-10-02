import { UsersApi } from "../_api";
import { GenericActions } from "./generic.actions";

export const usersActions = GenericActions({
  model: 'Users',
  Api: UsersApi,
  successMessages: {
    getAll: 'Usuarios obtenidos!',
    getOne: 'Usuario obtenido!',
    createOne: 'Usuario creado!',
    updateOne: 'Usuario actualizado!',
    deleteOne: 'Usuario eliminado!',
    toggleActive: 'Usuario eliminado!',
  }
})
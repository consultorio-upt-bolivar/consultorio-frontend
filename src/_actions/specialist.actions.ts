import { UsersApi } from "../_api";
import { GenericActions } from "./generic.actions";

export const specialistActions = GenericActions({
  model: 'Users',
  Api: UsersApi,
  successMessages: {
    getAll: 'Especialistas obtenidos!',
    getOne: 'Especialista obtenido!',
    createOne: 'Especialista creado!',
    updateOne: 'Especialista actualizado!',
    deleteOne: 'Especialista eliminado!',
    toggleActive: 'Especialista eliminado!',
  }
})
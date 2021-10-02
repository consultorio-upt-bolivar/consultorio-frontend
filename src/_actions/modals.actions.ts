import { ModalsApi } from "../_api";
import { GenericActions } from "./generic.actions";

export const modalsActions = GenericActions({
  model: 'Modals',
  Api: ModalsApi,
  successMessages: {
    getAll: 'Modales obtenidos!',
    getOne: 'Modal obtenido!',
    createOne: 'Modal creado!',
    updateOne: 'Modal actualizado!',
    deleteOne: 'Modal eliminado!',
    toggleActive : 'Modal eliminado!',
  }
})
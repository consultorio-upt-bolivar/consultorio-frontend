import { SpecialitiesApi } from "../_api";
import { GenericActions } from "./generic.actions";

export const specialitiesActions = GenericActions({
  model: 'Specialities',
  Api: SpecialitiesApi,
  successMessages: {
    getAll: 'Especialidades obtenidas!',
    getOne: 'Especialidad obtenida!',
    createOne: 'Especialidad creada!',
    updateOne: 'Especialidad actualizada!',
    deleteOne: 'Especialidad eliminada!',
    toggleActive: 'Especialidad actualizada!',
  }
})
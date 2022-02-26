import { SpecialitiesApi } from "../_api";
import { GenericActions } from "./generic.actions";

export const specialitiesActions = GenericActions({
  model: 'Specialities',
  Api: SpecialitiesApi,
  successMessages: {
    getAll: 'Especialidades médicas obtenidas!',
    getOne: 'Especialidad médica obtenida!',
    createOne: 'Especialidad médica creada!',
    updateOne: 'Especialidad médica actualizada!',
    deleteOne: 'Especialidad médica eliminada!',
    toggleActive: 'Especialidad médica actualizada!',
  }
})
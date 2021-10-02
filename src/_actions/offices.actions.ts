import { OfficesApi } from "../_api";
import { GenericActions } from "./generic.actions";

export const officesActions = GenericActions({
  model: 'Offices',
  Api: OfficesApi,
  successMessages: {
    getAll: 'Oficinas obtenidas!',
    getOne: 'Oficina obtenida!',
    createOne: 'Oficina creada!',
    updateOne: 'Oficina actualizada!',
    deleteOne: 'Oficina eliminada!',
    toggleActive: 'Oficina actualizada!',
  }
})
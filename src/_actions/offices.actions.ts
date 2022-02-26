import { OfficesApi } from "../_api";
import { GenericActions } from "./generic.actions";

export const officesActions = GenericActions({
  model: 'Offices',
  Api: OfficesApi,
  successMessages: {
    getAll: 'Consultorios médicos obtenidos!',
    getOne: 'Consultorio médico obtenido!',
    createOne: 'Consultorio médico creado!',
    updateOne: 'Consultorio médico actualizado!',
    deleteOne: 'Consultorio médico eliminado!',
    toggleActive: 'Consultorio médico actualizado!',
  }
})
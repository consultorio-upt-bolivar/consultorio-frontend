import { AppHistory } from '.'

interface ApiError {
  error: string
  message: string
  redirect?: string
}

const ApiMessages: ApiError[] = [
  {
    error: 'Invalid credentials or user inactive',
    message: 'Correo electrónico o contraseña inválidos.',
  },
  {
    error: 'backup database error',
    message: 'Error al respaldar la Base de Datos.',
  },
  {
    error: 'restore database error',
    message: 'Error al restaurar la Base de Datos.',
  },
  {
    error: 'file not found',
    message: 'Archivo adjunto inválido.',
  },
  {
    error: 'Invalid user',
    message: 'El usuario no tiene permiso para realizar esta acción.',
  },
  {
    error: 'User does not exists!',
    message: 'El usuario no existe.',
  },
  {
    error: 'Schedule does not exists!',
    message: 'Horario no encontrado.',
  },
  {
    error: 'MedicalAppointments already taken!',
    message: 'La cita médica que intenta agendar ya fue tomada.',
  },
  {
    error: 'Not found data',
    message: 'No se encontraron los datos.',
  },
  {
    error: 'Can not update resource!',
    message: 'Error al actualizar los datos.',
  },
  {
    error: 'User not found!',
    message: 'Usuario no encontrado.',
  },
  {
    error: 'dbName is required',
    message: 'Error en la conexión con la Base de Datos.',
  },
  {
    error: 'element already exists!',
    message: 'Los datos que intenta registrar ya existen.',
  },
  {
    error: 'Not found recource!',
    message: 'No se encontraron los datos.',
  },
  {
    error: 'Create user history error!',
    message: 'Error al crear el historial médico del usuario.',
  },
  {
    error: 'Update user error!',
    message: 'Error al actualizar los datos del usuario.',
  },
  {
    error: 'User already exists!',
    message: 'El usuario ya existe.',
  },
  {
    error: 'User status updated!',
    message: 'Estado del usuario actualizado.',
  },
  {
    error: 'Invalid Password Token!',
    message: 'El código ingresado es inválido.',
  },
  {
    error: 'Please send mail code first!',
    message: 'Solicitar el código previamente.',
  },
  {
    error: 'Update Password Error!',
    message: 'Error al actualizar la contraseña.',
  },
  {
    error: 'Update Password Success!',
    message: 'Contraseña actualizada.',
  },
  {
    error: 'Send mail error!',
    message: 'Error al enviar el correo electrónico.',
  },
  {
    error: 'Send mail ok!',
    message: 'Correo enviado existosamente.',
  },
  {
    error: 'Invalid legal id.',
    message: 'Cédula inválida.',
  },
  {
    error: 'user not authorized',
    message: 'El usuario está pendiente de autorización.'
  },
  {
    error: 'user inactive',
    message: 'El usuario ha sido deshabilitado por el administrador.',
  },
  {
    error: "family head do not exists!",
    message: 'El familiar ingresado no fue encontrado.',
  }
]


const NotFoundApiMessages: ApiError[] = [
  {
    error: 'Request failed with status code 401',
    message: 'La sesión ha expirado.',
    redirect: '/login',
  },
  {
    error: 'Request failed with status code 400',
    message: 'Los datos enviados son inválidos.',
  },
  {
    error: 'Request failed with status code 500',
    message: 'Error en el servidor.',
  },
  {
    error: 'Network Error',
    message: 'Error al conectarse con el servidor.',
  },
  {
    error: 'Request failed with status code 409',
    message: 'Los datos que intenta registrar ya existen.',
  }
]

export const handleError = ({
  message,
  response: responseAxios
}: any, noredirect = false): string => {
  try {
    const apiMessage = responseAxios?.data?.response?.message ?? responseAxios?.data?.response ?? message;

    // Find custom message
    let responseMsg: any = ApiMessages.find((el) => el.error == apiMessage)
  
    // Bad request
    if (!responseMsg && responseAxios?.status == 400) {
      responseMsg = {
        message: Array.isArray(apiMessage) ? apiMessage.join(', ') : apiMessage
      }
    }
  
    // Find backup message
    if (!responseMsg) {
      responseMsg = NotFoundApiMessages.find((el) => el.error == message)
    }
  
    // Redirect to another view
    if (!noredirect && responseMsg?.redirect) {
      AppHistory.push(responseMsg?.redirect)
    }
  
    return responseMsg?.message ?? "Error: Not found error message"
  } catch (error: any) {
    console.log(error)
    return error.message
  }
}

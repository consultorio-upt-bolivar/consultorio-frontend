import React from 'react'
import { Container, Typography } from '@material-ui/core'

export const NotFound = (): React.ReactElement => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Pagina no encontrada
      </Typography>
    </Container>
  )
}

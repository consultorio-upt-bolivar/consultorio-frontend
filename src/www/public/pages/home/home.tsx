import React from 'react'
import { Container } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const HomePage = (): React.ReactElement => {
  return (
    <Container component="main" maxWidth="xs">
      <div>Buenos Dias people!</div>
      <Link to="/login">Login</Link>
    </Container>
  )
}

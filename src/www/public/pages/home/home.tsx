import React from 'react'
import { Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const HomePage = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.authentication.user)
  return (
    <Container>
      <div
        style={{
          marginTop: '80px',
        }}
      >
        <div>Buenos Dias {userData ? userData.email : 'People'}!</div>
        <Link to="/login">Login</Link>
      </div>
    </Container>
  )
}

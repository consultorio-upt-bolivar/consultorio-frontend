import React from 'react'
import { Button, Container, Link } from '@material-ui/core'

import Sidemenu from './sidemenu'
import { AppHistory } from '../../../helpers'
import { formStyles } from '../../../common/components/formik'

export const AdminLayout = ({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement => {
  const classes = formStyles()

  return (
    <Container
      style={{
        display: 'flex',
      }}
    >
      <Sidemenu />
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '80px',
        }}
      >
        <div
          style={{
            flex: '1',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => AppHistory.goBack()}
          >
            Volver
          </Button>
        </div>
        {children}
      </Container>
    </Container>
  )
}

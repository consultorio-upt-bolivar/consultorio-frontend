import React from 'react'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { AdminLayout } from '../../components/adminLayout'

export const DashboardPage = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.authentication.user)

  return (
    <AdminLayout>
      <div>Buenos Dias {userData ? userData.email : 'People'}!</div>
    </AdminLayout>
  )
}

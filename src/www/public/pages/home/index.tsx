import React from 'react'
import { PublicLayout } from '../../../components/publicLayout'
import BannerHome from './banner'
import { ContactForm } from './contactForm'
import HomeInfo from './info'

export const HomePage = (): React.ReactElement => {
  return (
    <>
      <PublicLayout showFooter={true}>
        <>
          <BannerHome></BannerHome>
          <HomeInfo></HomeInfo>
          <ContactForm></ContactForm>
        </>
      </PublicLayout>
    </>
  )
}

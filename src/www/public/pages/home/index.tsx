import React from 'react'
import ModalsCarousel from '../../../components/modalsCarousel'
import { PublicLayout } from '../../../components/publicLayout'
import BannerHome from './banner'
import { ContactForm } from './contactForm'
import HomeInfo from './info'

export const HomePage = (): React.ReactElement => {
  return (
    <>
      <PublicLayout showFooter={true}>
        <>
          <ModalsCarousel></ModalsCarousel>
          <BannerHome></BannerHome>
          <HomeInfo></HomeInfo>
          <ContactForm></ContactForm>
        </>
      </PublicLayout>
    </>
  )
}

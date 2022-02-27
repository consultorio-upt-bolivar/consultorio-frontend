import React from 'react'
import ModalsCarousel from '../../../components/modalsCarousel'
import BannerHome from './banner'
import { ContactForm } from './contactForm'
import { HomeLayout } from './homeLayout'
import HomeInfo from './info'
import { styled } from '@mui/material/styles';
import HomeServices from './services'

const Div = styled('div')(() => ({
  width: '100%',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "120px 0",
  '&.alternative': {
    background: "#c0c0c00f"
  }
}));

export const HomePage = (): React.ReactElement => {
  return (
    <>
      <HomeLayout showFooter={true}>
        <>
          <ModalsCarousel></ModalsCarousel>

          <Div id='home'>
            <BannerHome></BannerHome>
          </Div>

          <Div id='services' className='alternative'>
            <HomeServices></HomeServices>
          </Div>

          <Div id='about-us'>
            <HomeInfo></HomeInfo>
          </Div>

          <Div id='contact' className='alternative'>
            <ContactForm></ContactForm>
          </Div>
        </>
      </HomeLayout>
    </>
  )
}

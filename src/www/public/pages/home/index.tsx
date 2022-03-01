import React from 'react'
import ModalsCarousel from '../../../components/modalsCarousel'
import BannerHome from './banner'
import { ContactForm } from './contactForm'
import { HomeLayout } from './homeLayout'
import HomeInfo from './info'
import { styled } from '@mui/material/styles';
import HomeServices from './services'

import {
  makeStyles,
} from '@mui/styles';

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

const useStyles = makeStyles({
  home: {
    backgroundImage: "url(/images/fondo4.png)",
    backgroundSize: "900px",
    backgroundPosition: "bottom left",
    backgroundRepeat: "no-repeat",
  },
  services: {
    backgroundImage: "url(/images/fondo3.png), url(/images/fondo2.png)",
    backgroundSize: "900px",
    backgroundPosition: "top left, bottom right",
    backgroundRepeat: "no-repeat",
    marginTop: "-1px",
  },
  about: {
    backgroundImage: "url(/images/fondo5.png)",
    backgroundSize: "900px",
    backgroundPosition: "top right",
    backgroundRepeat: "no-repeat",
    marginTop: "-1px",
  }
})

export const HomePage = (): React.ReactElement => {
  const styles = useStyles();

  return (
    <>
      <HomeLayout showFooter={true}>
        <>
          <ModalsCarousel></ModalsCarousel>

          <Div id='home' className={styles.home}>
            <BannerHome></BannerHome>
          </Div>

          <Div id='services' className={styles.services}>
            <HomeServices></HomeServices>
          </Div>

          <Div id='about-us' className={styles.about}>
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

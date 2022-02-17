import { Box, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import { modalsActions } from '../../_actions'
import { makeStyles } from '@mui/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import theme from '../../theme/main'

const useStyles = makeStyles({
    root: {
        maxWidth: "600px",
        userSelect: "none",
        zIndex: "9999",
        '& .carousel-slider': {
            maxWidth: "600px"
        },
        '& .slide.selected > div': {
            background: 'white',
            padding: '16px'
        },
        '& .control-arrow': {
            opacity: "1 !important",
            background: "rgba(0,0,0,0.2)"
        },
        '& .control-dots .dot': {
            width: "20px !important",
            height: "20px !important",
        }
    },
    backdrop: {
        '& > .MuiBackdrop-root': {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: "99"
        }
    }
});

export default function ModalsCarousel() {
    const { items = [] } = useSelector((store: any) => store.modals);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClose = () => {
        setOpen(!open)
    }

    useEffect(() => {
        dispatch(modalsActions.getAll({
            limit: 1000,
            offset: 0
        }, {
            toast: false
        }))
    }, [])

    useEffect(() => {
        if (items && items.length) {
            setOpen(true)
        }
    }, [items])

    return (
        <Modal
            disableEnforceFocus
            disableAutoFocus
            open={!!open}
            className={classes.backdrop}
            onBackdropClick={handleClose}
        >
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
            }}>
                <Carousel
                    className={classes.root}
                    showThumbs={false}
                    showStatus={false}
                    showArrows={false}
                    showIndicators={true}
                    dynamicHeight={false}
                    swipeable={true}
                >
                    {items.map((modal: any) => {
                        return <div key={modal.id}>
                            {/* <Typography sx={{ my: 1 }} variant='h5'>{modal.title}</Typography> */}
                            <img style={{
                                maxWidth: "500px"
                            }} src={modal.image} />
                            {/* <Typography sx={{ mt: 1, mb: 0, fontSize: 14 }} variant='h5'>{modal.description}</Typography> */}
                        </div>
                    })}
                </Carousel>
            </Box>
        </Modal>
    )
}
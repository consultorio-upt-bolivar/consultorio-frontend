import * as React from 'react';
import { Theme, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ArrowDownwardOutlined } from '@material-ui/icons';

const LayoutRoot = styled('section')(({ theme }) => ({
    width: "100%",
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
    },
}));

const Background = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
});

interface ProductHeroLayoutProps {
    sxBackground: SxProps<Theme>;
}

export default function BannerLayout(
    props: React.HTMLAttributes<HTMLDivElement> & ProductHeroLayoutProps,
) {
    const { sxBackground, children } = props;

    return (
        <LayoutRoot>
            <Container
                sx={{
                    width: "100%",
                    mt: 3,
                    mb: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {children}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'common.black',
                        opacity: 0.5,
                        zIndex: -1,
                    }}
                />
                <Background sx={sxBackground} />
                <Box
                    sx={{ position: 'absolute', bottom: 32 }}
                >
                    <ArrowDownwardOutlined style={{ width: "50px", height: "50px" }}></ArrowDownwardOutlined>
                </Box>

            </Container>
        </LayoutRoot>
    );
}
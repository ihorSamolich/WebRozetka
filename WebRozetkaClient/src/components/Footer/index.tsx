import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import React from "react";

function Copyright() {
    return (
        <Box>
            <Typography variant="body1" color="text.primary" textAlign="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    WebRozetka Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}
const Footer: React.FC = () => {
    return (
            <Box
                component="footer"
                sx={{
                    py: 1,
                    px: 1,
                    mt: 'auto',
                    backgroundColor: '#00000099'
                }}
            >
                <Container maxWidth="sm" sx={{paddingY: 2,}}>
                    <Copyright/>
                </Container>
            </Box>
    );
}
export  default  Footer;
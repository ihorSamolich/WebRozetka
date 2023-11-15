import { Typography, Box, List, ListItem } from '@mui/material';
import LogoRozetka from '../../assets/logo.png';
import * as React from "react";

const Home: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 2
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to My Website
            </Typography>
            <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </Typography>
            <img
                src={LogoRozetka}
                alt="Logo Rozetka"
                loading="lazy"
                style={{width: '200px', height: 'auto', borderRadius: '8px', marginTop: '16px'}}
            />
            <Typography variant="h5" component="h2" mt={4} gutterBottom>
                Our Services
            </Typography>
            <List>
                <ListItem>Seadipiscing</ListItem>
                <ListItem>Consectet</ListItem>
                <ListItem>Incididunt</ListItem>
            </List>

        </Box>
    );
}

export default Home;

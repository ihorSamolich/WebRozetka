import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const NotFound: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h1" sx={{ marginBottom: 2 }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Page Not Found
            </Typography>
        </Box>
    );
};

export default NotFound;
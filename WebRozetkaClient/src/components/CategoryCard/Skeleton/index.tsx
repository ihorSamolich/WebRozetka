import React from 'react';
import Grid from "@mui/material/Grid";
import {Skeleton} from "@mui/material";

const CategoryCardSkeleton: React.FC = () => {
    return (
        <Grid container sx={{marginBottom: 2}} spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {Array.from(new Array(3)).map((_, index) => (
                <Grid sx={{display: 'flex', justifyContent: 'center'}} item xs={6} sm={4} key={index}>
                    <Skeleton variant="rectangular" width='270px' height='465px' sx={{borderRadius: 5}}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoryCardSkeleton;
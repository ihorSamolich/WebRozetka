import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CategoryCard from "../../components/CategoryCard";
import * as React from "react";
import { Status } from "../../redux/categories/types.ts";
import {useEffect} from "react";
import { getCategories } from "../../redux/categories/asyncActions";
import CategoryCardSkeleton from "../../components/CategoryCard/Skeleton";
import {useAppDispatch,useAppSelector} from "../../hooks.ts";
import ItemsNotFound from "../../components/ItemsNotFound";
import Filters from "../../components/Filters";

const CategoriesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.items);
    const status = useAppSelector((state) => state.category.status);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <Box marginY={2}>
            <Grid container spacing={2}>

                <Grid sx={{ position: { xs: 'static', md: 'sticky' }, top: 0, height: { md: '100%'} }} item xs={12} md={3}>
                    <Filters />
                </Grid>

                <Grid item xs={12} md={9}>
                    {status === Status.LOADING ? (
                        <CategoryCardSkeleton />
                    ) : ((status === Status.ERROR || categories.length === 0) && <ItemsNotFound />)}

                    {status === Status.SUCCESS && (
                        <Grid color='#234444' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {categories.map((category) => (
                                <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={6} sm={4} key={category.id}>
                                    <CategoryCard {...category} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CategoriesPage;

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActions, CardHeader, IconButton } from '@mui/material';
import * as React from "react";
import {Category} from "../../redux/categories/types.ts";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotImage from '../../assets/imagenot.png';

const CategoryCard: React.FC<Category> = (props) => {
    const {name, description, image} = props;

    return (
        <Card
            sx={{
                maxWidth: 270,
                cursor: 'pointer',
                borderRadius: 5,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.025)',
                },
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.3)',
                width: '100%',
                backgroundColor: '#fff'
            }}
        >
            <CardHeader
                sx={{paddingBottom: 0}}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon color='secondary'/>
                    </IconButton>
                }
            />
            <CardMedia
                component="img"
                height="200"
                image={image ? `http://localhost:5135/images/${image}` : NotImage}
                alt={name}
                style={{objectFit: 'contain'}}
            />
            <CardContent sx={{
                flex: 1,
                padding: 2,
                backgroundImage: 'linear-gradient(0deg, rgba(234,255,0,1) 0%, rgba(255,255,255,1) 100%)',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography
                    gutterBottom
                    variant="button"
                    component="div"
                    color='#000'
                    sx={{
                        borderBottom: '#000 solid 2px',
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        textAlign: 'justify',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5,
                        textAlign: 'justify'
                    }}
                    variant="body2"
                    color="text.secondary"
                >
                    {description}
                </Typography>
                <CardActions
                    sx={{padding: 0, paddingTop: 2, marginTop: 'auto', display: 'flex', justifyContent: 'center'}}>
                    <Button size="small" variant="contained" color="secondary">Learn More</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;

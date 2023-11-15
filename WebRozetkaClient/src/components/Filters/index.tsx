import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterBody from "../FilterBody";
import {useMediaQuery, useTheme} from "@mui/material";


const Filters: React.FC = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [expanded, setExpanded] = React.useState<boolean>(isLargeScreen);

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Обрати фільтри:</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FilterBody/>
            </AccordionDetails>
        </Accordion>
    );
};

export default Filters;
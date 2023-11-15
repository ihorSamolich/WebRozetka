import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {InputLabel, NativeSelect, Slider, SliderThumb, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";


const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));
interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}
function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

const FilterBody = () => {
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" name="labelCheckbox" />
            <FormControlLabel required control={<Checkbox />} label="Required" name="requiredCheckbox" />
            <FormControlLabel control={<Checkbox />} label="Disabled" name="disabledCheckbox" />
            <InputLabel variant="standard" htmlFor="uncontrolled-native" id="ageLabel">
                Age
            </InputLabel>
            <NativeSelect
                defaultValue={30}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
            >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
            </NativeSelect>
            <Typography gutterBottom>Ціна:</Typography>
            <AirbnbSlider
                slots={{ thumb: AirbnbThumbComponent }}
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                defaultValue={[20, 40]}
                id="priceSlider"
            />
        </FormGroup>
    )
}

export default FilterBody;
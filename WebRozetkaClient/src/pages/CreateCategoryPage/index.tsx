import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Input, TextField} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PreviewImage from '../../assets/preview.png';
import { useAppDispatch } from '../../hooks.ts';
import { addCategory } from '../../redux/categories/asyncActions.ts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from "@mui/material/Typography";
import InfoAlert from "../../components/InfoAlert";

interface FormValues {
    name: string;
    image: File | undefined | null;
    description: string;
}

const CreateCategoryPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, isValid},
        watch,
        reset
    } = useForm<FormValues>({mode: "onBlur"});
    const image = watch('image');
    const [open, setOpen] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setValue('image', file);
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            console.log(data);
            
            const action = await dispatch(addCategory(data));

            if (addCategory.rejected.match(action)) {
                console.error(action.error);
                setResult(false);
            } else {
                setResult(true);
                reset();
            }
        } catch (error) {
            console.error(error);
            setResult(false);
        }
        setOpen(true);
    };

    return (
        <Box marginY={2}>
            <InfoAlert
                open={open}
                setOpen={setOpen}
                result={result ? "Категорію успішно створено!" : "Помилка створення категорії!"}
                severity={result ? "success" : "error"}
            />

            <Typography variant="h4" component="div"
                        sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Створити нову категорію
                <AddCircleIcon sx={{ml: 1, fontSize: '1.2em'}}/>
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Назва"
                    {...register('name', {
                        required: 'Це поле є обов\'язковим!',
                        minLength: {value: 3, message: 'Назва повинна містити мінімум 3 символи!'}
                    })}
                    fullWidth
                    variant="filled"
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    color='primary'
                />
                <TextField
                    label="Опис"
                    {...register('description', {
                        required: 'Це поле є обов\'язковим!',
                        minLength: { value: 10, message: 'Опис повинен містити мінімум 10 символів!' },
                    })}
                    fullWidth
                    variant="filled"
                    margin="normal"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <Input
                    id="image-upload"
                    type="file"
                    inputProps={{accept: 'image/*'}}
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                />
                <label
                    htmlFor="image-upload"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '#a3a2a2 solid 1px',
                        borderRadius: 5,
                        padding: 10,
                        cursor: 'pointer',
                        backgroundColor: '#ffffff99',
                    }}
                >
                    <img
                        src={image ? URL.createObjectURL(image) : PreviewImage}
                        alt="Selected Image"
                        style={{height: 150, marginBottom: 8, objectFit: 'cover'}}
                    />
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon/>}
                        style={{height: 40, width: '100%'}}
                    >
                        Upload Category Image
                    </Button>
                </label>
                <Box sx={{display: 'flex', justifyContent: 'center', padding: 2}}>
                    <Button type="submit" disabled={!isValid} variant="contained" color="primary">
                        Створити категорію
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateCategoryPage;

import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import {Box, Container} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import NotFound from "./components/NotFound";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import React, {useState} from "react";
import Footer from "./components/Footer";
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme.ts';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    return (
        <Provider store={store}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <BrowserRouter>
                    <CssBaseline/>
                    <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
                        <Container sx={{flex: 1}}>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='categories' element={<CategoriesPage/>}/>
                                <Route path='categories/create' element={<CreateCategoryPage/>}/>
                                <Route path='*' element={<NotFound/>}/>
                            </Routes>
                        </Container>
                        <Footer/>
                    </Box>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}
export default App

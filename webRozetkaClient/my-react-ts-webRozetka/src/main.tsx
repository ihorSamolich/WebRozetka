import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {store} from "store";
import {Provider} from "react-redux";
import './index.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

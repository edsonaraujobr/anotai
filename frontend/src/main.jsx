import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MainRoutes from "./routex.jsx"
import { BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <MainRoutes>
      <App />
    </MainRoutes>,
  </BrowserRouter>

)

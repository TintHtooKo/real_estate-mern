import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Route from './route/Route'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
        <Route/>
    </AuthContextProvider>
  </StrictMode>,
)

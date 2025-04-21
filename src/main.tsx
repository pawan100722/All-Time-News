import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainComponent } from './Components/MainComponent.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainComponent/>
    <ToastContainer/>
  </StrictMode>,
)

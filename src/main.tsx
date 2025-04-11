import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MainComponent } from './Components/MainComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainComponent/>
  </StrictMode>,
)

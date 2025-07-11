import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TimesDeFutebol from './TimesDeFutebol.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimesDeFutebol />
  </StrictMode>,
)

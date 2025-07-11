import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TimesDeFutebol from './TimesDeFutebol.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimesDeFutebol />
  </StrictMode>,
)

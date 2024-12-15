import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PopupApp from './popup/PopupApp'
import './index.css'

createRoot(document.getElementById('popup-root')!).render(
  <StrictMode>
    <PopupApp />
  </StrictMode>,
)

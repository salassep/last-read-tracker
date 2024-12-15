import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReaderApp from './reader/ReaderApp'
import './index.css'

createRoot(document.getElementById('reader-root')!).render(
  <StrictMode>
    <ReaderApp />
  </StrictMode>,
)

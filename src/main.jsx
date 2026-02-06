import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ContextUserProvider } from './Context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextUserProvider>
  </StrictMode>,
)

import { Provider } from "@/components/ui/provider.jsx"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Provider>
          <App />
        </Provider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)

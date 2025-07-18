import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n"; 
import { AuthProvider } from './AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <>
  <AuthProvider>
      <App />
  </AuthProvider>
  </>,
)
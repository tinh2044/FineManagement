import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './components/redux/store'
import { ToastProvider } from "./context/ToastProvider";

createRoot(document.getElementById('root')).render(
  // <StrictMode>

  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>
  // </StrictMode>,
)

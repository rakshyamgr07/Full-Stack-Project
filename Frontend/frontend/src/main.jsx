import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import { API } from './utils/api.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={API}>
  <BrowserRouter>
    <App />
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </BrowserRouter>
 </Provider>
 </StrictMode>
)

/***************************************************/
/* React entry point and connects with index.html  */
/* Mounts App into the root HTML element and       */
/* imports index.css                               */
/***************************************************/

import { StrictMode } from 'react'             //  Help identify potential problems during dev
import { createRoot } from 'react-dom/client'  // create the React application inside the HTML page
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

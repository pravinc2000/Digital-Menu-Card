import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Background.css'
import Pagerou from './Pagerou.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
<Pagerou/>
{/* <Routing/> */}
  </StrictMode>,
)


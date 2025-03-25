import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './presentation/app'
import {Flavors, Injection} from "./core";

// Initialisation de l'injection de dépendances
Injection.initiate(Flavors.Release)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

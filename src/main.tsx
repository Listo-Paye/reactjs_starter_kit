import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './presentation/app'
import {OidcProvider} from "@axa-fr/react-oidc"
import {ConfigurationImpl} from "./core/di/configuration"
import InjectionProvider from "./injection"
import {BrowserRouter} from "react-router"

const oidcConfiguration = new ConfigurationImpl().toOidcConfiguration()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <OidcProvider configuration={oidcConfiguration}>
                <InjectionProvider>
                    <App/>
                </InjectionProvider>
            </OidcProvider>
        </BrowserRouter>
    </StrictMode>,
)

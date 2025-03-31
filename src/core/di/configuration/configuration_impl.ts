import {injectable} from "inversify";
import {IApiConfiguration, IAuthenticationConfiguration, IConfiguration} from "./configuration.ts";

@injectable()
export class ConfigurationImpl implements IConfiguration {
    authentication: IAuthenticationConfiguration
    api: IApiConfiguration

    constructor() {
        this.authentication = {
            clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
            clientSecret: import.meta.env.VITE_OIDC_CLIENT_SECRET,
            authority: import.meta.env.VITE_OIDC_AUTHORITY,
            postLogoutRedirectUriSuffix: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI_SUFFIX,
            silentRedirectUriSuffix: import.meta.env.VITE_OIDC_SILENT_REDIRECT_URI_SUFFIX,
            redirectUriSuffix: import.meta.env.VITE_OIDC_REDIRECT_URI_SUFFIX,
        }
        this.api = {
            apiUrl: import.meta.env.VITE_API_URL,
            apiVersion: import.meta.env.VITE_API_VERSION,
        }
    }

    toOidcConfiguration(): any {
        const silentRedirectUriSuffix = this.authentication.silentRedirectUriSuffix
        if (silentRedirectUriSuffix?.startsWith("/")) {
            silentRedirectUriSuffix.substring(1)
        }
        return {
            client_id: this.authentication.clientId,
            redirect_uri: `${window.location.origin}/${this.authentication.postLogoutRedirectUriSuffix}`,
            silent_redirect_uri: `${window.location.origin}/${silentRedirectUriSuffix}`,
            scope: 'openid profile email api offline_access', // offline_access scope allow your client to retrieve the refresh_token
            authority: this.authentication.authority,
            service_worker_relative_url: '/OidcServiceWorker.js', // just comment that line to disable service worker mode
            service_worker_only: false,
            demonstrating_proof_of_possession: false,
        }
    }
}

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
        }
        this.api = {
            apiUrl: import.meta.env.VITE_API_URL,
            apiVersion: import.meta.env.VITE_API_VERSION,
        }
    }
}

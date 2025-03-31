import {injectable} from "inversify";
import {IApiConfiguration, IAuthenticationConfiguration, IConfiguration} from "./configuration.ts";

@injectable()
export class ConfigurationStub implements IConfiguration {
    authentication: IAuthenticationConfiguration
    api: IApiConfiguration

    constructor() {
        this.authentication = {
            clientId: "client-id",
            clientSecret: "secret",
            authority: "https://example.com",
            postLogoutRedirectUriSuffix: "portal/",
            silentRedirectUriSuffix: "silent-renewal/"
        }
        this.api = {
            apiUrl: "https://api.example.com",
            apiVersion: undefined
        }
    }
}

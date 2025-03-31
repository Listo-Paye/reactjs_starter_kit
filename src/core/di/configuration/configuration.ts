export interface IConfiguration {
    authentication: IAuthenticationConfiguration
    api: IApiConfiguration
}

export interface IAuthenticationConfiguration {
    clientId: string | undefined
    clientSecret: string | undefined
    authority: string | undefined
    postLogoutRedirectUriSuffix: string | undefined
    silentRedirectUriSuffix: string | undefined
}

export interface IApiConfiguration {
    apiUrl: string | undefined
    apiVersion: string | undefined
}

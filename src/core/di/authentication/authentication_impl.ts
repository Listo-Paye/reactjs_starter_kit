import {Observable} from 'rxjs'
import {IAuthentication} from './authentication'
import {OidcClient} from '@axa-fr/oidc-client'
import {inject, injectable} from 'inversify'
import type {IConfiguration} from '../configuration'

@injectable()
export class AuthenticationImpl implements IAuthentication {
    private oidc: OidcClient = OidcClient.get('default')
    private isConnectedObservable: Observable<boolean> = new Observable<boolean>(subscriber => {
        this.oidc.subscribeEvents((name: string) => {
            if (
                name === OidcClient.eventNames.logout_from_another_tab ||
                name === OidcClient.eventNames.logout_from_same_tab ||
                name === OidcClient.eventNames.token_acquired
            ) {
                subscriber.next(this.oidc.tokens != null)
            }
        })
    })

    constructor(
        @inject("IConfiguration") private configuration: IConfiguration
    ) {
    }

    login(callbackPath: string | undefined): Promise<unknown> {
        const suffix = callbackPath
        if (suffix?.startsWith("/")) {
            suffix.substring(1)
        }
        return this.oidc.loginAsync(
            (callbackPath?.startsWith("http") ? callbackPath : `${window.location.origin}/${suffix}`),
            undefined,
            false
        )
    }

    silentLogin(): Promise<unknown> {
        return this.oidc.loginAsync(
            undefined,
            undefined,
            true
        )
    }

    logout(): Promise<void> {
        return this.oidc.logoutAsync(
            `${window.location.origin}/${this.configuration.authentication.postLogoutRedirectUriSuffix}`
        )
    }

    getAccessToken = async (): Promise<string | undefined> => {
        const tokens = await this.oidc.getValidTokenAsync()
        return tokens.tokens.accessToken
    }

    isAuthenticated(): Observable<boolean> {
        return this.isConnectedObservable
    }
}

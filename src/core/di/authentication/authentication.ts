import {Observable} from "rxjs";

export interface IAuthentication {
    login(
        callbackPath: string | undefined,
    ): Promise<unknown>
    silentLogin(): Promise<unknown>
    logout(
        callbackPath: string | undefined,
    ): Promise<void>
    getAccessToken(): Promise<string | undefined>
    isAuthenticated(): Observable<boolean>
}

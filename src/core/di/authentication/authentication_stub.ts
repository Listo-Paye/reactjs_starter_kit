import {injectable} from "inversify"
import {IAuthentication} from "./authentication"
import {Observable, Subscriber} from "rxjs"

@injectable()
export class AuthenticationStub implements IAuthentication {
    private connected: boolean = false
    private subscriber: Subscriber<boolean> | undefined
    private isConnectedObservable: Observable<boolean> = new Observable<boolean>(subscriber => {
        this.subscriber = subscriber
        this.subscriber.next(this.connected)
    })

    public get isConnected(): boolean {
        return this.connected
    }

    public set isConnected(value: boolean) {
        if (this.subscriber) {
            this.subscriber.next(value)
        }
        this.connected = value
    }

    // @ts-ignore
    login(callbackPath: string | undefined): Promise<unknown> {
        this.isConnected = true
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.isConnected)
            }, 100)
        })
    }
    silentLogin(): Promise<unknown> {
        this.isConnected = true
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.isConnected)
            }, 100)
        })
    }
    // @ts-ignore
    logout(callbackPath: string | undefined): Promise<void> {
        this.isConnected = false
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 100)
        })
    }
    getAccessToken(): Promise<string | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("access-token")
            }, 100)
        })
    }
    isAuthenticated(): Observable<boolean> {
        return this.isConnectedObservable

    }

}

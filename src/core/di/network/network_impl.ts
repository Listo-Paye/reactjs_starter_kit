import {inject, injectable} from "inversify"
import {INetwork} from "./network"
import { UserService } from "./user_service"
import {RequestInterceptorFunction, ServiceBuilder} from "axios-retrofit"
import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios"
import {AxiosCacheInstance, setupCache} from "axios-cache-interceptor"
import type {IAuthentication, IConfiguration} from "@core"

@injectable()
export class NetworkImpl implements INetwork {
    private _userService?: UserService
    private _oidcInterceptor: RequestInterceptorFunction = (config: InternalAxiosRequestConfig) => {
        config.headers.set("Authorization", `Bearer ${this._oidc.getAccessToken()}`)
        return config;
    }
    get userService(): UserService {
        if (!this._userService) {
            const instance: AxiosInstance = axios.create()
            const axiosWithCache:  AxiosCacheInstance = setupCache(instance)
            this._userService = new ServiceBuilder()
                .setEndpoint(this.configuration.api.apiUrl || "")
                .setStandalone(axiosWithCache)
                .setRequestInterceptors(this._oidcInterceptor)
                .build(UserService)
        }
        return this._userService
    }
    constructor(
        @inject("IAuthentication") private _oidc: IAuthentication,
        @inject("IConfiguration") private configuration: IConfiguration
    ) {
    }
}

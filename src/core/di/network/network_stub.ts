import {inject, injectable} from "inversify"
import {INetwork} from "./network"
import { UserService } from "./user_service"
import {RequestInterceptorFunction, ServiceBuilder} from "axios-retrofit"
import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios"
import {AxiosCacheInstance, setupCache} from "axios-cache-interceptor"
import fs from "fs"
import path from "path"
import type {IConfiguration} from "@core"

@injectable()
export class NetworkStub implements INetwork {
    private _userService?: UserService
    private _mockedInterceptor: RequestInterceptorFunction = (config: InternalAxiosRequestConfig) => {
        try {
            const url = new URL(config.url || '', 'http://localhost').pathname
            const method = config.method?.toLowerCase() || 'get'

            const mockFilePath = path.resolve(
                __dirname,
                `../../specs/mocks/api${url}/${method}.json`
            )

            if (fs.existsSync(mockFilePath)) {
                const data = fs.readFileSync(mockFilePath, 'utf-8');
                return Promise.reject({
                    config,
                    response: {
                        status: 200,
                        statusText: "OK",
                        headers: {},
                        config,
                        data: JSON.parse(data),
                    },
                })
            }
        } catch (error) {
            console.error('Error loading mock:', error)
        }
        return config
    }
    get userService(): UserService {
        if (!this._userService) {
            const instance: AxiosInstance = axios.create()
            const axiosWithCache:  AxiosCacheInstance = setupCache(instance)
            this._userService = new ServiceBuilder()
                .setEndpoint(this.configuration.api.apiUrl || "")
                .setStandalone(axiosWithCache)
                .setRequestInterceptors(this._mockedInterceptor)
                .build(UserService)
        }
        return this._userService
    }
    constructor(
        @inject("IConfiguration") private configuration: IConfiguration
    ) {
    }
}

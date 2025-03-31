import {ConfigurationImpl, ConfigurationStub, IConfiguration} from "./configuration"
import {Flavors} from "./flavors"
import {Injection} from "./injection"
import {AuthenticationImpl, AuthenticationStub, IAuthentication} from "./authentication"

export const configureInjection = (environment: Flavors) => {
    if (environment == Flavors.Release) {
        Injection.register<IConfiguration>('IConfiguration', ConfigurationImpl, "singleton")
        Injection.register<IAuthentication>('IAuthentication', AuthenticationImpl, "singleton")
    }

    if (environment == Flavors.Test) {
        Injection.register<IConfiguration>('IConfiguration', ConfigurationStub, "singleton")
        Injection.register<IAuthentication>('IAuthentication', AuthenticationStub, "singleton")
    }
}

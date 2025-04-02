import {ConfigurationImpl, ConfigurationStub, IConfiguration} from "./configuration"
import {Flavors, Injection, INetwork} from "@core"
import {AuthenticationImpl, AuthenticationStub, IAuthentication} from "./authentication"
import {NetworkImpl, NetworkStub} from "./network";

export const configureInjection = (environment: Flavors) => {
    if (environment == Flavors.Release) {
        Injection.register<IConfiguration>('IConfiguration', ConfigurationImpl, "singleton")
        Injection.register<IAuthentication>('IAuthentication', AuthenticationImpl, "singleton")
        Injection.register<INetwork>("INetwork", NetworkImpl, "singleton")
    }

    if (environment == Flavors.Test) {
        Injection.register<IConfiguration>('IConfiguration', ConfigurationStub, "singleton")
        Injection.register<IAuthentication>('IAuthentication', AuthenticationStub, "singleton")
        Injection.register<INetwork>("INetwork", NetworkStub, "singleton")
    }
}

import {ConfigurationImpl, ConfigurationStub, IConfiguration} from "./configuration";
import {Flavors} from "./flavors";
import {Injection} from "./injection";

export const configureInjection = (environment: Flavors) => {
    if (environment == Flavors.Release) {
        Injection.register<IConfiguration>('IConfiguration', ConfigurationImpl, "singleton")
    }

    if (environment == Flavors.Test) {
        Injection.register<IConfiguration>('IConfiguration', ConfigurationStub, "singleton")
    }
}

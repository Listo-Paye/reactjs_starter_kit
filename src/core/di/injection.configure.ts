import {Flavors} from "./flavors.ts";

export const configureInjection = (environment: Flavors) => {
    // Register services here
    // Injection.register(ServiceIdentifier)
    console.debug("Injection configured for", environment)
}

import {BindInWhenOnFluentSyntax, Container, Newable} from "inversify"
import {ServiceIdentifier} from "@inversifyjs/common";
import {Flavors} from "./flavors.ts";
import {configureInjection} from "./injection.configure.ts";

export class Injection {
    private static _injection: Container

    public static get current(): Container {
        return Injection._injection
    }

    public static initiate(environment: Flavors): void {
        Injection._injection = new Container()

        configureInjection(environment)
    }

    public static get<T>(serviceIdentifier: ServiceIdentifier<T>): T | undefined {
        return Injection.current.get<T>(serviceIdentifier)
    }

    public static register<T>(
        serviceIdentifier: ServiceIdentifier<T>,
        implementation: Newable<T> | undefined,
        pattern: "singleton" | "factory" | undefined
    ): void {
        if (pattern == undefined || pattern === "singleton") {
            Injection._bind(serviceIdentifier, implementation).inSingletonScope()
            return
        }
        Injection._bind(serviceIdentifier, implementation).inTransientScope()
    }

    private static _bind<T>(
        serviceIdentifier: ServiceIdentifier<T>,
        implementation: Newable<T> | undefined
    ): BindInWhenOnFluentSyntax<T> {
        if (implementation === undefined) {
            return Injection.current.bind<T>(serviceIdentifier).toSelf()
        }
        return Injection.current.bind<T>(serviceIdentifier).to(implementation)
    }
}

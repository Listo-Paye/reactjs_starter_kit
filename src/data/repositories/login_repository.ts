import {inject, injectable} from "inversify"
import type {IAuthentication} from "@core"

@injectable()
export class LoginRepository {
    constructor(
        @inject("IAuthentication") private authentication: IAuthentication,
    ) {
    }

    public call = async (): Promise<void> => {
        await this.authentication.login("/")
    }
}

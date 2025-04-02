import {inject, injectable} from "inversify"
import type {INetwork} from "@core"
import {UserDto} from "@data"

@injectable()
export class UserRepository {
    constructor(
        @inject("INetwork") private network: INetwork,
    ) {
    }

    public call = async (): Promise<UserDto> => {
        const userResponse = await this.network.userService.getUser()
        return userResponse.data
    }
}
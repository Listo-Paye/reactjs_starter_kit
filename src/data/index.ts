import {Injection} from "@core";
import { UserRepository } from "./repositories/user_repository"

export { UserDto } from "./dto/user_dto"
export { UserRepository } from "./repositories/user_repository"
export { UserProtocol } from "./protocols/user_protocol"

export const registerInjections = () => {
    Injection.register<UserRepository>("UserRepository", UserRepository, "factory")
}

import {Injection} from "@core";
import { UserRepository } from "./repositories/user_repository"
import { LoginRepository } from "./repositories/login_repository"

export { UserDto } from "./dto/user_dto"

export { UserRepository } from "./repositories/user_repository"
export { LoginRepository } from "./repositories/login_repository"

export { UserProtocol } from "./protocols/user_protocol"

export const registerDataInjections = () => {
    Injection.register<UserRepository>("UserRepository", UserRepository, "factory")
    Injection.register<LoginRepository>("LoginRepository", LoginRepository, "factory")
}

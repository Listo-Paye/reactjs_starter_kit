import {Injection} from "@core";
import { UserUseCase } from "./usecases/user_usecase"
import {LoginUseCase} from "./usecases/login_usecase"

export { User } from "./entities/user_entity"
export { UserUseCase } from "./usecases/user_usecase"
export { LoginUseCase } from "./usecases/login_usecase"

export const registerDomainInjections = () => {
    Injection.register<UserUseCase>("UserUseCase", UserUseCase, "singleton")
    Injection.register<LoginUseCase>("LoginUseCase", LoginUseCase, "factory")
}

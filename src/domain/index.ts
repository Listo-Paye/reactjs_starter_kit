import {Injection} from "@core";
import { UserUseCase } from "./usecases/user_usecase"

export { User } from "./entities/user_entity"
export { UserUseCase } from "./usecases/user_usecase"

export const registerInjections = () => {
    Injection.register<UserUseCase>("UserUseCase", UserUseCase, "singleton")
}

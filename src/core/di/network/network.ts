import {UserService} from "./user_service"

export interface INetwork {
    get userService(): UserService;
}

import {UserService} from "./user_service"

export interface Network {
    get userService(): UserService;
}

import {UserDto} from "@data"
import {User} from "@domain"

export class UserProtocol {
    static toDomain(userDto: UserDto): User {
        return new User(userDto.name, userDto.email)
    }

    static fromDomain(user: User): UserDto {
        return new UserDto(user.name, user.email)
    }
}

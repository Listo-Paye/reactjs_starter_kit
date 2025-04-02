import {
    BasePath, BaseService, GET, Response
} from "axios-retrofit"
import {UserDto} from "@data"

const basePath = "/api"
const version = "v1"


@BasePath(`${basePath}/${version}`)
export class UserService extends BaseService {
    @GET("/user")
    async getUser(): Promise<Response<UserDto>> { return <Response<UserDto>> {} }
}

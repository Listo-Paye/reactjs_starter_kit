import {inject, injectable} from "inversify";
import {LoginRepository} from "@data"

@injectable()
export class LoginUseCase {
    constructor(
        @inject("LoginRepository") private loginRepository: LoginRepository
    ) {
    }

    public call = async (): Promise<void> => {
       await this.loginRepository.call()
    }
}

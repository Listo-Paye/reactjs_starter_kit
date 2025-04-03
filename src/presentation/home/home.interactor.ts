import {inject, injectable} from "inversify";
import {LoginUseCase, UserUseCase} from "@domain";
import {map} from "rxjs";

@injectable()
export class HomeInteractor {
    constructor(
        @inject("UserUseCase") private userUseCase: UserUseCase,
        @inject("LoginUseCase") private loginUseCase: LoginUseCase,
    ) {
    }

    public get stream() {
        return this.userUseCase.stream.pipe(
            map(user => user.name)
        )
    }

    public call = async (): Promise<void> => {
        await this.userUseCase.call()
    }

    public login = async (): Promise<void> => {
        await this.loginUseCase.call()
    }
}

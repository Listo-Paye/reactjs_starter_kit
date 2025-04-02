import {inject, injectable} from "inversify";
import {UserProtocol, UserRepository} from "@data";
import {Observable, Subscriber} from "rxjs";
import {User} from "@domain";

@injectable()
export class UserUseCase {
    private subscriber: Subscriber<User> | undefined
    private observable: Observable<User> = new Observable<User>(subscriber => {
        this.subscriber = subscriber
    })

    constructor(
        @inject("UserRepository") private userRepository: UserRepository,
    ) {
    }

    public get stream(): Observable<User> {
        return this.observable
    }

    public call = async (): Promise<void> => {
        const result = await this.userRepository.call()
        const user = UserProtocol.toDomain(result)
        this.subscriber?.next(user)
    }
}
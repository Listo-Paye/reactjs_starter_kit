import {inject, injectable} from "inversify";
import {HomeInteractor} from "./home.interactor.ts";

@injectable()
export class HomeModel {
    constructor(
        @inject("HomeInteractor") private homeInteractor: HomeInteractor
    ) {}

    public refresh = async (): Promise<void> => {
        await this.homeInteractor.call()
    }

    public login = async (): Promise<void> => {
        await this.homeInteractor.login()
    }

    public get stream() {
        return this.homeInteractor.stream
    }
}

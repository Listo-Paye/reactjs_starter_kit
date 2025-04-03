import { default as Home } from "./view/home"
import {Injection} from "@core";
import {HomeModel} from "./home.model.ts";
import {HomeInteractor} from "./home.interactor.ts";

Injection.register<HomeInteractor>("HomeInteractor", HomeInteractor, "singleton")
Injection.register<HomeModel>("HomeModel", HomeModel, "singleton")

export default Home

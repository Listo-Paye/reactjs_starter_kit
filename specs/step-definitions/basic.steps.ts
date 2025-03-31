import { loadFeature, defineFeature } from "jest-cucumber"
import {theApplicationStartsFromTheRoute} from "./common/application";
import {iCanSeeTheText} from "./common/finds";

const feature = loadFeature("specs/features/basic.feature")

defineFeature(feature, test => {
    test("Show the main page", ({ given, when, then }) => {
        theApplicationStartsFromTheRoute(given)
        iCanSeeTheText(then)
    })
})

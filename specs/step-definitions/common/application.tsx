import {DefineStepFunction} from "jest-cucumber";

export const theApplicationStartsFromTheRoute = (step: DefineStepFunction) => {
    step(/^The application starts from the route {'(\S*)'}$/, (route: string) => {
        // Given step implementation
    })
}

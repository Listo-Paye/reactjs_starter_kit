import {DefineStepFunction} from "jest-cucumber";

export const iCanSeeTheText = (step: DefineStepFunction) => {
    step(/^I can see the text {'(.*)'}$/, (text: string) => {
        // Then step implementation
    })
}

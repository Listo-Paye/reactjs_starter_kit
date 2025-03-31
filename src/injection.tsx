import {Flavors, Injection} from "./core"
import {PropsWithChildren} from "react"

// make InjectionProvider a functional component with children

const InjectionProvider = ({children}: PropsWithChildren) => {
    Injection.initiate(Flavors.Release)
    return (
        <>
            {children}
        </>
    )
}


export default InjectionProvider

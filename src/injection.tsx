import {Flavors, Injection} from "@core"
import {PropsWithChildren} from "react"
import {registerDataInjections} from "@data";
import {registerDomainInjections} from "@domain";

// make InjectionProvider a functional component with children

const InjectionProvider = ({children}: PropsWithChildren) => {
    Injection.initiate(Flavors.Release)
    registerDataInjections()
    registerDomainInjections()
    return (
        <>
            {children}
        </>
    )
}


export default InjectionProvider

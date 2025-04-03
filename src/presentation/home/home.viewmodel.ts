import {useEffect, useState} from "react";
import {Injection} from "@core";
import {HomeModel} from "./home.model.ts";

export const useHomeViewModel = () => {
    const [userName, setUserName] = useState<string>("")
    const homeModel = Injection.get<HomeModel>("HomeModel")

    useEffect(() => {
        const subscription = homeModel?.stream.subscribe((state) => {
            setUserName(state || "");
        })
        return () => {
            subscription?.unsubscribe()
        }
    }, [homeModel])

    return {
        userName,
        refresh: async () => {
            await homeModel?.refresh()
        },
        login: async () => {
            await homeModel?.login()
        }
    }

}

import { useEffect } from "react"
import { Header } from "../../components/header/header"
import { Navbar } from "../../components/navbar/navbar"
import { auth } from "../../firebase/firebase"

export const MainPage = () => {
    useEffect(() => {
        console.log(auth?.currentUser)
    }, [auth])
    return (
        <>
        <Navbar />
        <Header />
        sfg
            {auth?.currentUser?.email}
        </>
    )
}
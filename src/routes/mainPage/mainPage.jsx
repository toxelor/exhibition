import { useEffect, useState } from "react"
import { Header } from "../../components/header/header"
import { Navbar } from "../../components/navbar/navbar"
import { auth, db } from "../../firebase/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Exhibitions } from "../../components/exhibitions/exhibitions"

export const MainPage = () => {
    const [filter, setFilter] = useState('')
    const [exhibits, setExhibits] = useState()

    useEffect(() => {
        let q = query(collection(db, 'exhibitions'));
        if (filter.length > 0) {
            q = query(q, where('title', '==', filter))
        }
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(q);
                const result = querySnapshot?.docs?.map((doc) => ({
                    ...doc.data(), id: doc.id
                }))
                setExhibits(result);
            } catch (error) {
                console.log(error)
                openNotification({
                    type: 'error',
                    message: JSON.stringify(error)
                })
            }
        };
        fetchData ()
    }, [filter]);
    return (
        <>
        <Navbar />
        <Header 
            filter={filter}
            setFilter={setFilter}
        />
        <Exhibitions exhibits={exhibits} />
        </>
    )
}
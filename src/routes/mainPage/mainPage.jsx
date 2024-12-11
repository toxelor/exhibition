import { useEffect, useState } from "react"
import { Header } from "../../components/header/header"
import { Navbar } from "../../components/navbar/navbar"
import { auth, db } from "../../firebase/firebase"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { Exhibitions } from "../../components/exhibitions/exhibitions"

export const MainPage = () => {
    const [filter, setFilter] = useState('')
    const [exhibits, setExhibits] = useState([])
    const [allExgibits, setAllExhibits] = useState([])

    useEffect(() => {
        let q = query(collection(db, 'exhibitions'));
        if (filter.length > 0) {
            q = query(q, where('title', '==', filter))
        }
        q = query(q, orderBy('createdAt', 'desc'))
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(q);
                const result = querySnapshot?.docs?.map((doc) => ({
                    ...doc.data(), id: doc.id
                }))
                setAllExhibits(result)
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
    }, []);

    useEffect(() => {
        setExhibits([...allExgibits.filter((element) => element.title.includes(filter))])
    }, [filter])

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
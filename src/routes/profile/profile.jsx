import { Radio } from "antd"
import { Header } from "../../components/header/header"
import { Navbar } from "../../components/navbar/navbar"
import { auth, db } from "../../firebase/firebase"
import s from './profile.module.css'
import './profile.css'
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { Exhibitions } from "../../components/exhibitions/exhibitions"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
    const navigate = useNavigate()
    const options = [
        {label: 'Ваши выставки', value: 'user'},
        {label: 'Избранные выставки', value: 'liked'}
    ]
    const [subPage, setSubPage] = useState('user')
    const [exhibits, setExhibits] = useState([])
    const getUserExhibits = async () => {
        let q = query(collection(db, 'exhibitions'), where('userId', '==', auth?.currentUser?.uid))
        const querySnapshot = await getDocs(q);
        const result = querySnapshot?.docs?.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        setExhibits(result);
    }
    const getLikedExhibits = async () => {
        const snapshot = await getDoc(doc(db, 'users', auth?.currentUser?.uid))
        const data = snapshot.data()
        data.liked.forEach(async (element) => {
            const snapshot = await getDoc(doc(db, 'exhibitions', element))
            const data = snapshot.data()
            setExhibits((prev) => [...prev, {id: snapshot.id, ...data}])
        });
    }
    useEffect(() => {
        try {
            if (subPage === 'user') {
                setExhibits([])
                getUserExhibits()
            } else {
                setExhibits([])
                getLikedExhibits()
            }
        } catch (error) {
            console.log(error)
            navigate('/')
        }

    }, [subPage])

    return (
        <>
            <Navbar />
            <Header onExhibit={{actually: true, title: auth?.currentUser?.email?.split('@')[0]}}/>
            <div className={s.mainWrapper}>
                <Radio.Group
                    block 
                    options={options}
                    defaultValue={'liked'}
                    value={subPage}
                    onChange={(e) => setSubPage(e.target.value)}
                    optionType="button"
                    buttonStyle="solid"
                />
                <Exhibitions exhibits={exhibits} deletable={true}/>
            </div>
        </>
    )
}
import { Image } from 'antd'
import s from './imageRowView.module.css'
import { auth, db } from '../../firebase/firebase'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
export const ImageRowView = ({urlList}) => {
    const id = useParams().id
    const [allLiked, setAllLiked] = useState([])
    const [liked, setLiked] = useState(false)
    const handleLike = async () => {
        setLiked((prev) => prev = !prev)
        let temp = [...allLiked]
        if (liked) {
            temp = temp.filter((element) => element !== id)
        } else {
            temp = [...temp, id]
        }
        setAllLiked([...temp])
        await updateDoc(doc(db, 'users', auth?.currentUser?.uid), {
            liked: [...temp]
        })
    }
    useEffect(() => {
        const fetchLikes = async () => {
            const snapshot = await getDoc(doc(db, 'users', auth?.currentUser?.uid))
            const data = snapshot.data()
            setAllLiked([...data.liked])
            if (data.liked.includes(id)) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
        fetchLikes()
    }, [])
    return (
        <div className={s.imageRowWrapper}>
            {
                auth?.currentUser ?
                liked ?
                <HeartFilled style={{color: '#e60023'}} className={s.imageRowLike} onClick={handleLike} />
                :
                <HeartOutlined style={{color: '#e60023'}} className={s.imageRowLike} onClick={handleLike}/>
                :
                null
            }
            <div className={s.imageRow}>
            {
                Array.from(new Set(urlList))?.map((url) => {
                        return (
                            <div className={s.imageWrapper}>
                                <Image height={200} className={s.image} src={`${url}`} />
                            </div>
                        )
                    })
            }
        </div>
        </div>
        
    )
}
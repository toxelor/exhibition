import { useParams } from "react-router-dom"
import { Navbar } from "../../components/navbar/navbar"
import { useEffect, useState } from "react"
import { db, storage } from "../../firebase/firebase"
import { getDownloadURL, listAll, ref } from "firebase/storage"
import { ImageRowView } from "../../components/imageRowView/imageRowView"
import { doc, getDoc } from "firebase/firestore"
import { Header } from "../../components/header/header"


export const Exhibit = () => {
    const exhibitId = useParams().id
    const [imageUrls, setImageUrls] = useState([])
    const [exhibit, setExhibit] = useState()
    useEffect(() => {
        const getInfo = async () => {
            const snapshot = await getDoc(doc(db, 'exhibitions', exhibitId))
            const data = snapshot.data()
            setExhibit({...data})
            const imagesListRef = ref(storage, `${data.imageFolder}/`);
            listAll(imagesListRef).then((response) => {
                    response.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                            setImageUrls((prev) => [...prev, url])
                        })
                });
            });

        }
        getInfo()
    }, [])
    return (
        <>
            <Navbar />
            <Header onExhibit={{actually: true, title: `Выставка имени ${exhibit?.title}`}} />
            <ImageRowView urlList={imageUrls} />
        </>
    )
}
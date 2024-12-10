import { Button, Image, Input } from "antd"
import { Navbar } from "../../components/navbar/navbar"
import s from './createExhibit.module.css'
import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import { ImageRow } from "../../components/imageRow/imageRow"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { auth, db, storage } from "../../firebase/firebase"
import { v4 } from "uuid"
import { translit } from "../../components/helpers/translit"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const CreateExhibit = () => {
    const [name, setName] = useState('')
    const [asd, setAsd] = useState('')
    const [fileList, setFileList] = useState([])
    const navigate = useNavigate()
    let zxc = ''

    const uploadFile = async (file, folder, urlVar) => {
        const imageRef = ref(storage, `${folder}/${file.name + v4()}`);
        return uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                urlVar = url
                console.log(url)
                zxc = url
                setAsd((prev) => prev = url)
            });
        });
    }

    const handleSave = async () => {
        try {
            const folderName = auth?.currentUser?.uid + "_" + translit(name)
            let url = ''
            const promises = []
            fileList.forEach((file) => {
                promises.push(uploadFile(file, folderName, url))
            });
            Promise.all(promises).then(async (values) => {
                console.log('val', values)
                console.log('zxc', zxc)
                console.log('asd', asd)
                await addDoc(collection(db, "exhibitions"), {
                    userId: auth?.currentUser?.uid,
                    title: name,
                    imageFolder: folderName,
                    createdAt: serverTimestamp(),
                    previewUrl: zxc,
                })
                navigate('/')
            })

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            <Navbar />
            <div>
                <div className={s.inputWrapper}>
                    <span className={s.inputLabel}>Выставка имени </span>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className={s.inputName} placeholder="..."/>
                </div>
                <div className={s.imageUploadWrapper}>
                    <label className={s.imageLabel} for="image_uploads"><PlusOutlined /></label>
                    <input className={s.imageUpload} id="image_uploads" onChange={(e) => {setFileList([...fileList, e.target.files[0]])}} type="file" accept="image/*"/>
                </div>
                <ImageRow 
                    fileList={fileList}
                    setFileList={setFileList}
                    editable
                />
                <Button onClick={handleSave} className={s.saveButton} disabled={name.length === 0 || fileList.length === 0 }>Сохранить</Button>
            </div>
        </>

    )
}
import { Link, useNavigate } from 'react-router-dom'
import s from './exhibitions.module.css'
import { Image, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/firebase'
import { deleteObject, listAll, ref } from 'firebase/storage'
import { openNotification } from '../helpers/notification'
export const Exhibitions = ({exhibits, deletable=false}) => {
    const navigate = useNavigate()
    const handleDelete = async (exhibit) => {
        // await deleteObject(ref(storage, `${exhibit.imageFolder}/`))
        const imagesListRef = ref(storage, `${exhibit.imageFolder}/`)
        listAll(imagesListRef).then((response) => {
                response.items.forEach(async(item) => {
                    await deleteObject(item,fullPath)
            });
        });
        await deleteDoc(doc(db, "exhibitions", exhibit.id))
        openNotification({
            type: 'success',
            message: 'Выставка успешно удалена'
        })
    }
    return (
        <div className={s.exhibitionsWrapper}>
            {
                exhibits?.length > 0 ?
                exhibits?.map((exhibit) => {
                    return (
                        <div key={exhibit.id} className = {s.wrap}>
                            <Link className={s.exhibitTitle} to={`/exhibit/${exhibit.id}`}>
                                <div className={s.exhibitWrapper}>
                                    <Image className={s.imagePreview} preview={false} height={150} src={`${exhibit.previewUrl}`} alt='123'/>
                                    <span className={s.exhibitTitle}>Выставка имени {exhibit.title}</span>
                                    <span className={s.exhibitTitle}>{exhibit?.author}</span>
                                </div>
                            </Link>
                            {/* {
                                deletable && <DeleteOutlined onClick={() => handleDelete(exhibit)} className={s.deleteButton} />
                            } */}
                        </div>

                        
                    )
                })
                :
                <div className={s.placeholder}>
                    Тут пока ничего нет
                </div>
            }
        </div>
    )
}
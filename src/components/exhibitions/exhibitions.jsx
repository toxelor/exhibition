import { Link } from 'react-router-dom'
import s from './exhibitions.module.css'
import { Image } from 'antd'
export const Exhibitions = ({exhibits}) => {
    return (
        <div className={s.exhibitionsWrapper}>
            {
                exhibits?.map((exhibit) => {
                    return (
                        <Link className={s.exhibitTitle} to={`${exhibit.imageFolder}`}>
                            <div className={s.exhibitWrapper}>
                                <Image preview={false} height={150} src={`${exhibit.previewUrl}`} alt='123'/>
                                <span className={s.exhibitTitle}>Выставка имени {exhibit.title}</span>
                            </div>
                        </Link>

                    )
                })
            }
        </div>
    )
}
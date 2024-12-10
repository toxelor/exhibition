import { Image } from 'antd'
import s from './imageRow.module.css'
import { DeleteOutlined } from '@ant-design/icons'
export const ImageRow = ({fileList, setFileList, editable=false}) => {
    const handleDelete = (index) => {
        const temp = fileList.filter((_, ind) => ind !== index)
        setFileList(temp)
    }
    return (
        <div className={s.imageRow}>
            {
                fileList?.map((file, index) => {
                        const url = URL.createObjectURL(file)
                        return (
                            <div className={s.imageWrapper}>
                                <Image height={130} className={s.image} src={`${url}`} />
                                {editable && fileList.length > 1 && <DeleteOutlined onClick={() => handleDelete(index)}/>}
                            </div>
                        )
                    })
            }
        </div>
    )
}
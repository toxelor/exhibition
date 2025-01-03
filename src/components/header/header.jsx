import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import s from "./header.module.css"
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import { LoginModal } from '../modals/loginModal/loginModal'
import { useState } from 'react'

export const Header = ({filter, setFilter, onExhibit}) => {
    const [open, setOpen] = useState({open: false, flag: 'login'})
    return (
        <div className={s.headerWrapper}>
            {
                onExhibit?.actually ?
                <div className={s.headerTitle}>
                    {onExhibit?.title}
                </div>
                :
                <>
                    <div className={s.headerInputWrapper}>
                    <input value={filter} onChange={(e) => setFilter(e.target.value)} className={s.headerInput} placeholder='...'/>
                    <span className={s.searchIcon} >Выставка имени</span>
                    </div>
                    {
                        auth?.currentUser ? 
                        <Link to={"/profile"}><UserOutlined className={s.headerIcon}/></Link>
                        :
                        <>
                            <LoginModal open={open} setOpen={setOpen}/>
                            <span onClick={() => {setOpen({open: true, flag: 'login'})}} className={`${s.headerButton + ' ' + s.headerLogin}`}>Войти</span>
                            <span onClick={() => {setOpen({open: true, flag: 'register'})}} className={`${s.headerButton + ' ' + s.headerRegister}`}>Регистрация</span>
                        </>

                    }
                </>
            }


        </div>
    )
}
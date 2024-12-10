import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import s from "./header.module.css"
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import { LoginModal } from '../modals/loginModal'
import { useState } from 'react'

export const Header = () => {
    const [open, setOpen] = useState({open: false, flag: 'login'})
    return (
        <div className={s.headerWrapper}>
            <div className={s.headerInputWrapper}>
                <input className={s.headerInput} placeholder='Найти выставку'/>
                <SearchOutlined className={s.searchIcon} />
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

        </div>
    )
}
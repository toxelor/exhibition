import { Button, Input } from "antd"
import { openNotification } from "../../helpers/notification"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import s from './loginFields.module.css'


export const LoginFields = ({ switchFields }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async() => {
        if (email === '' || password === '') {
            openNotification({type: 'info', message: 'Пожалуста, заполните все поля'})
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                navigate('/loading')
            } catch (error) {
                openNotification({type: 'error', message: "Что-то пошло не так, проверьте правильность введённых данных"})
            }
        }
    }
    return (
        <div className={s.loginWrapper}>
            <Input
                placeholder="Электронная почта" 
                required 
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <Input 
                placeholder="Пароль" 
                required 
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <Button onClick={loginHandler}>
                Войти
            </Button>
            <span className={s.switch} onClick={switchFields}>Зарегистрироваться</span>
        </div>
    )
}
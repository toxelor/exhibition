import { Button, Input } from "antd"
import { openNotification } from "../../helpers/notification"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import s from './loginFields.module.css'


export const RegisterFields = ({ switchFields }) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const registerHandler = async() => {
        if (email === '' || password1 === '' || password2 === '') {
            openNotification({type: 'info', message: 'Пожалуста, заполните все поля'})
        } else if (password1 !== password2) {
            openNotification({type: 'info', message: 'Пароли должны совпадать'})
        } else if (password1.length < 6) {
            openNotification({type: 'info', message: 'Пароль должен состоять как минимум из 6 символов'})
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password1)
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
                    setPassword1(e.target.value)
                }}
            />
            <Input 
                placeholder="Подтвердите пароль" 
                required 
                type="password"
                onChange={(e) => {
                    setPassword2(e.target.value)
                }}
            />
            <Button onClick={registerHandler}>
                Зарегистрироваться
            </Button>
            <span className={s.switch} onClick={switchFields}>Войти</span>
        </div>
    )
}
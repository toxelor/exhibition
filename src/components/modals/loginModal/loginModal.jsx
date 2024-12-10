import { Button, Modal } from "antd"
import { LoginFields } from "./loginFields"
import { RegisterFields } from "./registerFields"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../../firebase/firebase"
import { openNotification } from "../../helpers/notification"
import { useNavigate } from "react-router-dom"

export const LoginModal = ({open, setOpen}) => {
    const navigate = useNavigate()
    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/loading')
        } catch(error) {
            console.log(error)
            openNotification({type: 'error', message: 'Что-то пошло не так, попробуйте позже'}) 
        }
    }
    return (
        <Modal
            open={open.open}
            title={open.flag === 'login' ? 'Вход' : 'Регистрация'}
            onCancel={() => setOpen({open: false, flag: 'login'})}
            footer={null}
        >
            <div style={{display: 'flex', flexDirection:'column'}}>
                {
                    open.flag === 'login' 
                    ?
                    <LoginFields switchFields={() => setOpen({open: true, flag: 'register'})}/>
                    :
                    <RegisterFields switchFields={() => setOpen({open: true, flag: 'login'})}/>
                }
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={loginWithGoogle}>
                        Войти с Google
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
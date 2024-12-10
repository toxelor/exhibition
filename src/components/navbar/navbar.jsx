import { HomeOutlined, LogoutOutlined, PlusCircleOutlined } from "@ant-design/icons"
import s from "./navbar.module.css"
import { auth } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export const Navbar = () => {
    const navigate = useNavigate();
    const logOut = async () => {
        await signOut(auth)
        navigate('/loading')
    }
    return (
        <div className={s.navbarWrapper}>
            <div className={s.topBlock}>
                <Link to={'/'}><HomeOutlined className={s.navIcon}/></Link>
                <Link to={'/create-exhibit'}><PlusCircleOutlined className={s.navIcon}/></Link>
            </div>
            <div className={s.bottomBlock}>
                <LogoutOutlined onClick={logOut} className={s.navIcon}/>
            </div>
        </div>
    )
}
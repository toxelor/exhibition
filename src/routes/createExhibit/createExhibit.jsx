import { Input } from "antd"
import { Navbar } from "../../components/navbar/navbar"

export const CreateExhibit = () => {
    return (
        <>
            <Navbar />
            <div>
                <Input />
                <input type="file"/>
            </div>
        </>

    )
}
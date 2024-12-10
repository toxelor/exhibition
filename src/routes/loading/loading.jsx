import { LoadingOutlined } from "@ant-design/icons"
import { Flex, Spin } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Loading = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/')
    }, [])
    return (
        <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined spin/>} size="xxl"/>
        </Flex>
    )
}
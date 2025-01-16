import { UserOutlined } from "@ant-design/icons"
import { Flex, Typography } from "antd"
import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import './style.scss'

const AdminLayout = () => {
    return (
        <Flex className="admin-layout">
            <Navbar />
            <Flex className="admin-main" vertical gap={15}>
                <Flex vertical>
                    <Flex className="admin-header">
                        <Typography.Title level={5}><UserOutlined /> Admin Panel</Typography.Title>
                    </Flex>
                    <Flex vertical className="admin-content">
                        <Outlet />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default AdminLayout
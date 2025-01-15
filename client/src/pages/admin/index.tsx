import { Flex } from "antd"
import { Outlet } from "react-router-dom"
import './style.scss'
import Navbar from "../../components/Navbar"

const AdminLayout = () => {
    return (
        <Flex className="admin-layout">
            <Navbar />
            <Flex className="admin-main" vertical>
                <Flex className="admin-header">Admin Panel</Flex>
                <Flex vertical className="admin-content">
                    <Outlet />
                </Flex>
                <Flex>Footer</Flex>
            </Flex>
        </Flex>
    )
}

export default AdminLayout
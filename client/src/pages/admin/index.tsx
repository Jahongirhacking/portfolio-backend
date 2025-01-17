import { HomeOutlined, MenuOutlined, UserOutlined, WifiOutlined } from "@ant-design/icons"
import { Button, Flex, message, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { API_PROFILE_URL } from "../../utils/config"
import { getLocalStorage, localStorageNames } from "../../utils/storageUtils"
import './style.scss'

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                if (getLocalStorage(localStorageNames.token)) {
                    console.log(getLocalStorage(localStorageNames.token));
                    await axios.get(`${API_PROFILE_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                        },
                    })
                }
            } catch (err) {
                message.warning("Parol o'zgargan ko'rinadi");
                localStorage.removeItem(localStorageNames.token);
                navigate('/');
                console.error(err);
            }
        })()
    }, [navigate])

    return (
        <Flex className="admin-layout">
            <Navbar className={`navbar ${isNavbarVisible ? 'active' : 'inactive'}`} />
            <Flex className="admin-main" vertical gap={15}>
                <Flex vertical>
                    <Flex className="admin-header" justify="space-between">
                        <Link to={'/admin/view/categories'}>
                            <Typography.Title level={5} style={{ margin: 0 }}><UserOutlined /> Admin Panel</Typography.Title>
                        </Link>
                        <Flex gap={15} align='center'>
                            <Link to={'/admin/view/categories'}><HomeOutlined style={{ fontSize: '15pt' }} /></Link>
                            <Link to={'/admin/view/profile'}><UserOutlined style={{ fontSize: '15pt' }} /></Link>
                            <a href={'https://tursunaliyev-portfolio.netlify.app/'}><WifiOutlined style={{ fontSize: '15pt' }} /></a>
                            <Button icon={<MenuOutlined />} onClick={() => setIsNavbarVisible(prev => !prev)} />
                        </Flex>
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
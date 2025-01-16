import { Button, Card, Flex, Form, Input, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setAuthenticated } from "../../store/slices/adminSlice";
import { RootState } from "../../store/store";
import { API_BASE_URL } from "../../utils/config";
import { localStorageNames, setLocalStorage } from "../../utils/storageUtils";
import './style.scss';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ADMIN_URL = '/admin/view/categories';
    const isAuthenticated = useSelector((store: RootState) => store.admin.isAuthenticated)

    const handleSubmit = async ({ username, password }: { username: string, password: string }) => {
        try {
            const { data: { token } } = await axios.post(`${API_BASE_URL}/auth/signin`, { username, password });
            if (token) {
                setLocalStorage(localStorageNames.token, token);
                dispatch(setAuthenticated(true));
                navigate(ADMIN_URL);
                message.success("Muvaffaqiyatli kirildi")
            }
        } catch (err) {
            console.log(err);
            message.error('Login yoki parol xato')
        }
    }

    if (isAuthenticated) return <Navigate to={ADMIN_URL} />

    return (
        <Flex className="login-page" vertical>
            <Form
                className="login-form"
                name="loginForm"
                layout='vertical'
                onFinish={handleSubmit}
            >
                <Card title='Admin paneli'>
                    <Flex className="form-item__container" vertical align="center">
                        <Form.Item
                            label='Username'
                            name='username'
                            rules={[
                                { required: true, message: 'username kiriting' }
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label='Parol'
                            name='password'
                            rules={[
                                { required: true, message: 'parol kiriting' }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                Kirish
                            </Button>
                        </Form.Item>
                    </Flex>
                </Card>
            </Form>
        </Flex>
    )
}

export default LoginPage
import { Button, Card, Flex, Form, Input } from "antd";
import './style.scss';

const LoginPage = () => {
    return (
        <Flex className="login-page" vertical>
            <Form
                className="login-form"
                name="loginForm"
                layout='vertical'
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
                            <Input />
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
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Image, Input, message, Typography } from "antd"
import { useForm } from "antd/es/form/Form"
import axios from "axios";
import { useState } from "react";
import { API_MAIN_URL } from "../../../../utils/config";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../../store/slices/categorySlice";
import { getLocalStorage, localStorageNames } from "../../../../utils/storageUtils";

const AddCategory = () => {
    const [form] = useForm();
    const [img, setImg] = useState('');
    const dispatch: AppDispatch = useDispatch();

    const clearInputs = () => {
        setImg('');
        form.resetFields();
    }

    const handleAddCategory = async (values: { name: string }) => {
        try {
            await axios.post(`${API_MAIN_URL}/categories`, { ...values, img }, {
                headers: {
                    Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`
                }
            });
            dispatch(fetchCategories());
            message.success("Muvaffaqiyatli qo'shildi");
            clearInputs();
        } catch (err) {
            console.error(err);
            message.error("Xatolik")
        }
    }

    return (
        <Flex vertical>
            <Form
                onFinish={handleAddCategory}
                name="add-category-form"
                layout="vertical"
                form={form}
            >
                <Flex justify='space-between' align="center">
                    <Typography.Title level={3} style={{ margin: 0 }}>Kategoriya</Typography.Title>
                    <Button icon={<PlusCircleOutlined />} type="primary" htmlType="submit">Qo'shish</Button>
                </Flex>
                <Divider />
                <Form.Item
                    label={'Kategoriya nomi'}
                    name={'name'}
                    rules={[
                        { required: true, message: 'nom kiriting' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={'Kategoriya rasmi url'}
                    rules={[
                        { required: true, message: 'url kiriting' }
                    ]}
                >
                    <Input value={img} onChange={({ target: { value } }) => setImg(value)} />
                </Form.Item>
                <Image fallback="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg" width={100} src={img} alt="Kategoriya rasmi" />
            </Form>
        </Flex>
    )
}

export default AddCategory
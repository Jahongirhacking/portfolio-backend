import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AddImageUrl from "../../../../components/AddImageUrl";
import { fetchCategories } from "../../../../store/slices/categorySlice";
import { AppDispatch } from "../../../../store/store";
import { API_MAIN_URL, AUTHORIZATION_HEADER } from "../../../../utils/config";

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
            await axios.post(`${API_MAIN_URL}/categories`, { ...values, img }, AUTHORIZATION_HEADER);
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
                    <Input autoComplete="off" />
                </Form.Item>
                <AddImageUrl label="Kategoriya rasm url" img={img} setImg={setImg} />
            </Form>
        </Flex>
    )
}

export default AddCategory
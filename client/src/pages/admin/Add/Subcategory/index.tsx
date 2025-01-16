import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddImageUrl from "../../../../components/AddImageUrl";
import NotFound from "../../../../components/NotFound";
import { fetchCategories } from "../../../../store/slices/categorySlice";
import { AppDispatch, RootState } from "../../../../store/store";
import { API_MAIN_URL, AUTHORIZATION_HEADER } from "../../../../utils/config";

const AddSubCategory = () => {
    const { category } = useParams();
    const categories = useSelector((store: RootState) => store.category.categories);
    const [form] = useForm();
    const [img, setImg] = useState('');
    const dispatch: AppDispatch = useDispatch();

    const clearInputs = () => {
        setImg('');
        form.resetFields();
    }

    const handleAddCategory = async (values: { name: string }) => {
        try {
            await axios.post(`${API_MAIN_URL}/${category}/categories`, { ...values, img }, AUTHORIZATION_HEADER);
            dispatch(fetchCategories());
            message.success("Muvaffaqiyatli qo'shildi");
            clearInputs();
        } catch (err) {
            console.error(err);
            message.error("Xatolik")
        }
    }

    if (!categories.find(c => c.name === category)) return (
        <NotFound subTitle="Kechirasiz kategoriya topilmadi" />
    )

    return (
        <Flex vertical>
            <Typography.Title level={3}>{category?.toUpperCase()}</Typography.Title>
            <Form
                onFinish={handleAddCategory}
                name="add-category-form"
                layout="vertical"
                form={form}
            >
                <Flex justify='space-between' align="center">
                    <Typography.Title level={4} style={{ margin: 0 }}>Subkategoriya</Typography.Title>
                    <Button icon={<PlusCircleOutlined />} type="primary" htmlType="submit">Qo'shish</Button>
                </Flex>
                <Divider />
                <Form.Item
                    label={'Subkategoriya nomi'}
                    name={'name'}
                    rules={[
                        { required: true, message: 'nom kiriting' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <AddImageUrl label="Subkategoriya rasm url" img={img} setImg={setImg} />
            </Form>
        </Flex>
    )
}

export default AddSubCategory
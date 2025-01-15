import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Image, Input, message, Result, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCategories } from "../../../../store/slices/categorySlice";
import { AppDispatch, RootState } from "../../../../store/store";
import { API_MAIN_URL } from "../../../../utils/config";
import { getLocalStorage, localStorageNames } from "../../../../utils/storageUtils";

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
            await axios.post(`${API_MAIN_URL}/${category}/categories`, { ...values, img }, {
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

    if (!categories.find(c => c.name === category)) return (
        <Result
            status="404"
            title="404"
            subTitle="Kechirasiz kategoriya topilmadi"
            extra={<Link to={'/admin/categories'}>Orqaga</Link>}
        />
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
                <Form.Item
                    label={'Subkategoriya rasmi url'}
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

export default AddSubCategory
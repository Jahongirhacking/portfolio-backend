import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message, Select, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AddImageUrl from "../../../../components/AddImageUrl";
import InfoAdder from "../../../../components/InfoAdder";
import LinksAdder from "../../../../components/LinksAdder";
import { fetchCategories } from "../../../../store/slices/categorySlice";
import { AppDispatch, RootState } from "../../../../store/store";
import { ICategory, InfoProps } from "../../../../types";
import { getSubCategories } from "../../../../utils/categoryUtil";
import { API_MAIN_URL } from "../../../../utils/config";
import { getLocalStorage, localStorageNames } from "../../../../utils/storageUtils";

const AddItem = () => {
    const categories = useSelector((store: RootState) => store.category.categories);
    const searchParams = useSearchParams();
    const categoryName = searchParams[0].get('category');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [links, setLinks] = useState<string[]>([]);
    const [info, setInfo] = useState<InfoProps[]>([]);
    const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
    const [form] = useForm();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const queue = [...categories];
        while (queue.length) {
            const temp = queue.shift();
            if (temp?.name === categoryName) {
                setCurrentCategory(temp);
                return;
            }
            if (!temp) continue;
            for (const c of temp!.categories) queue.push(c);
        }
    }, [categories, categoryName])

    const options = getSubCategories(currentCategory ? [currentCategory] : categories).map((c) => ({
        label: c?.name?.toUpperCase(),
        value: c?.name
    })) ?? []

    const clearInputs = () => {
        form.resetFields();
        setImg('');
        setCategory('');
        setLinks([]);
        setInfo([]);
    }

    const handleSubmit = async ({ title, rating }: { title: string, rating: string, }) => {
        try {
            await axios.post(`${API_MAIN_URL}/${category}/items`, { title, rating, img, links, info }, {
                headers: {
                    Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                },
            })
            dispatch(fetchCategories());
            message.success("Muvaffaqiyatli yuborildi!");
            clearInputs();
        } catch (err) {
            console.error(err);
            message.error("Xatolik")
        }
    }

    return (
        <Flex vertical>
            <Form
                name="add-item-form"
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
            >
                <Flex align="center" justify="space-between">
                    <Typography.Title level={4}>
                        Loyiha
                    </Typography.Title>
                    <Button htmlType="submit" type="primary" icon={<PlusCircleOutlined />}>Qo'shish</Button>
                </Flex>
                <Form.Item
                    label={'Sarlavha'}
                    name={'title'}
                    rules={[
                        { required: true, message: "sarlavha kiriting" }
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                    label={'Kategoriya'}
                    required
                >
                    <Select
                        options={options}
                        value={category}
                        onChange={(value) => setCategory(value)}
                    />
                </Form.Item>
                <AddImageUrl label="Loyiha rasm url" img={img} setImg={setImg} />
                <Form.Item
                    label={'Reyting'}
                    name={'rating'}
                    rules={[
                        { required: true, message: "reyting kiriting" }
                    ]}
                >
                    <Input type="number" max={5} min={0} placeholder="0...5" />
                </Form.Item>
                <Divider />
                <InfoAdder info={info} setInfo={setInfo} />
                <Divider />
                <LinksAdder links={links} setLinks={setLinks} />
            </Form>
        </Flex>
    )
}

export default AddItem
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message, Select, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import AddImageUrl from "../../../../components/AddImageUrl";
import InfoAdder from "../../../../components/InfoAdder";
import LinksAdder from "../../../../components/LinksAdder";
import { RootState } from "../../../../store/store";
import { ICategory, InfoProps } from "../../../../types";
import { API_MAIN_URL, AUTHORIZATION_HEADER } from "../../../../utils/config";

const AddItem = () => {
    const categories = useSelector((store: RootState) => store.category.categories);
    const searchParams = useSearchParams();
    const categoryName = searchParams[0].get('category');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [links, setLinks] = useState<string[]>([]);
    const [info, setInfo] = useState<InfoProps[]>([]);

    const getSubCategories = (categories: ICategory[]): ICategory[] => {
        const subcategories: ICategory[] = [];
        const queue: ICategory[] = [...categories];
        while (queue.length) {
            const temp = queue.shift() as ICategory;
            if (!temp?.categories || !temp?.categories.length) {
                subcategories.push({ ...temp });
                continue;
            }
            for (const category of temp.categories) {
                queue.push(category);
            }
        }
        return [...subcategories];
    }

    const currentCategory = categories.find((c) => c.name === categoryName);

    const options = getSubCategories(currentCategory ? [currentCategory] : categories).map((c) => ({
        label: c?.name?.toUpperCase(),
        value: c?.name
    })) ?? []

    const handleSubmit = async ({ title, rating }: { title: string, rating: string, }) => {
        try {
            await axios.post(`${API_MAIN_URL}/${category}/items`, { title, rating, img, links, info }, AUTHORIZATION_HEADER)
            message.success("Muvaffaqiyatli yuborildi!")
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
                    <Input />
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
                    <Input type="number" max={10} min={0} placeholder="0...10" />
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
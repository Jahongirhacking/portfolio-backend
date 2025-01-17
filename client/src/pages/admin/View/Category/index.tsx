import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message, Switch, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddImageUrl from "../../../../components/AddImageUrl";
import CategoryCard from "../../../../components/CategoryCard";
import ItemCard from "../../../../components/ItemCard";
import NotFound from "../../../../components/NotFound";
import { fetchCategories } from "../../../../store/slices/categorySlice";
import { AppDispatch, RootState } from "../../../../store/store";
import { ItemProps } from "../../../../types";
import { API_MAIN_URL } from "../../../../utils/config";
import { getLocalStorage, localStorageNames } from "../../../../utils/storageUtils";

const ViewCategory = () => {
    const { category } = useParams();
    const categories = useSelector((store: RootState) => store.category.categories);
    const currentCategory = categories.find((c) => c.name === category);
    const [items, setItems] = useState<ItemProps[]>([]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [disabled, setDisabled] = useState(true);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (currentCategory) {
                setName(currentCategory.name);
                setImg(currentCategory.img);
            }
            if (categories.length) {
                setItems((await axios.get(`${API_MAIN_URL}/${category}/items`)).data)
            }
        })();
    }, [categories, category, currentCategory])

    const handleChange = async () => {
        try {
            await axios.put(`${API_MAIN_URL}/category/${currentCategory?.id}`, { name, img }, {
                headers: {
                    Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                },
            });
            dispatch(fetchCategories());
            setDisabled(true);
            navigate(`/admin/view/${name}`);
            message.success("Muvaffaqiyatli o'zgartirildi");
        } catch (err) {
            message.error("O'zgartirishda xatolik")
            console.error(err);
        }
    }

    if (!currentCategory) return <NotFound subTitle="Kechirasiz kategoriya topilmadi" />

    return (
        <Flex vertical className='view-page view-category' gap={12}>
            <Flex className="main banner" style={{ backgroundImage: `url(${currentCategory.img})` }}>
                <Typography.Title level={2}>{category?.toUpperCase()}</Typography.Title>
            </Flex>
            <Form
                name="subcategory-form"
                layout="horizontal"
                onFinish={handleChange}
            >
                <Flex gap={12} justify="space-between" style={{ marginBottom: 15 }}>
                    <Flex gap={8}>
                        <Typography.Text>O'zgartirish</Typography.Text>
                        <Switch value={!disabled} onChange={() => setDisabled(prev => !prev)} />
                    </Flex>
                    <Button htmlType="submit" type="primary" icon={<SaveOutlined />} disabled={disabled}>Saqlash</Button>
                </Flex>
                <Form.Item
                    label="Kategoriya nomi"
                    required
                >
                    <Input value={name} onChange={({ target: { value } }) => { setName(value) }} disabled={disabled} />
                </Form.Item>
                <AddImageUrl label="Kategoriya rasm url" img={img} setImg={setImg} disabled={disabled} />
            </Form>
            <Divider>Subkategoriyalar</Divider>
            <Button
                type="primary"
                className="add-item-btn"
                onClick={() => { navigate(`/admin/add/${category}/subcategory`) }}
                style={{ width: 'auto', margin: 'auto' }}
            >
                <PlusCircleOutlined /> Subkategoriya Qo'shish
            </Button>
            <Flex gap={8} wrap>
                {
                    currentCategory.categories.map((sc) => (
                        <CategoryCard
                            key={sc.id}
                            category={sc}
                            onView={() => { navigate(`./${sc.name}`) }}
                        />
                    ))
                }
            </Flex>
            <Divider>Loyihalar</Divider>
            <Button
                type="primary"
                className="add-item-btn"
                onClick={() => { navigate(`/admin/add/item?category=${category}`) }}
                style={{ width: 'auto', margin: 'auto' }}
            >
                <PlusCircleOutlined /> Loyiha Qo'shish
            </Button>
            <Flex gap={8} wrap>
                <>
                    {
                        items.map((it) => (
                            <ItemCard
                                key={it.title}
                                item={it}
                                onView={() => { navigate(`/admin/view/items/${it.id}`) }}
                            />
                        ))
                    }
                </>
            </Flex>
        </Flex>
    )
}

export default ViewCategory
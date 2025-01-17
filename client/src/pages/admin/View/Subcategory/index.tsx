import { PlusCircleOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Divider, Empty, Flex, Form, Input, message, Switch, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import AddImageUrl from "../../../../components/AddImageUrl"
import ItemCard from "../../../../components/ItemCard"
import NotFound from "../../../../components/NotFound"
import { fetchCategories } from "../../../../store/slices/categorySlice"
import { AppDispatch, RootState } from "../../../../store/store"
import { ItemProps } from "../../../../types"
import { API_MAIN_URL } from "../../../../utils/config"
import { getLocalStorage, localStorageNames } from "../../../../utils/storageUtils"

const ViewSubCategory = () => {
    const { category, subcategory } = useParams();
    const categories = useSelector((store: RootState) => store.category.categories);
    const currentCategory = categories.find((c) => c.name === category)?.categories.find((c) => c.name === subcategory);
    const [items, setItems] = useState<ItemProps[]>([]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [disabled, setDisabled] = useState(true);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (currentCategory) {
                setImg(currentCategory.img);
                setName(currentCategory.name);
            }
            if (categories.length) {
                setItems((await axios.get(`${API_MAIN_URL}/${subcategory}/items`)).data);
            };
        })()
    }, [categories, subcategory, currentCategory]);

    const handleChange = async () => {
        try {
            await axios.put(`${API_MAIN_URL}/category/${currentCategory?.id}`, { name, img }, {
                headers: {
                    Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                },
            });
            dispatch(fetchCategories());
            setDisabled(true);
            navigate(`/admin/view/${category}/${name}`);
            message.success("Muvaffaqiyatli o'zgartirildi");
        } catch (err) {
            message.error("O'zgartirishda xatolik")
            console.error(err);
        }
    }

    if (!currentCategory) return <NotFound subTitle="Kechirasiz kategoriya topilmadi" />

    return (
        <Flex vertical gap={15}>
            <Flex className="main banner" style={{ backgroundImage: `url(${currentCategory.img})` }}>
                <Typography.Title level={3}>{currentCategory.name.toUpperCase()}</Typography.Title>
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
                    label="Subkategoriya nomi"
                    required
                >
                    <Input value={name} onChange={({ target: { value } }) => { setName(value) }} disabled={disabled} />
                </Form.Item>
                <AddImageUrl label="Subkategoriya rasm url" img={img} setImg={setImg} disabled={disabled} />
            </Form>
            <Divider style={{ margin: '10px 0' }} />
            <Flex gap={10} justify='space-between' align="center" wrap>
                <Typography.Title level={5} style={{ margin: 0 }}>{`${category?.toUpperCase()} > ${subcategory?.toUpperCase()}`}</Typography.Title>
                <Button
                    type="primary"
                    className="add-item-btn"
                    onClick={() => { navigate(`/admin/add/item?category=${subcategory}`) }}
                >
                    <PlusCircleOutlined /> Loyiha Qo'shish
                </Button>
            </Flex>
            <Flex gap={8} wrap>
                <>
                    {
                        items.length
                            ? items.map((it) => (
                                <ItemCard
                                    key={it.title}
                                    item={it}
                                    onView={() => { navigate(`/admin/view/items/${it.id}`) }}
                                />
                            ))
                            : <Empty description={"Loyiha qo'shilmagan"} style={{ margin: 'auto' }} />
                    }
                </>
            </Flex>
        </Flex>
    )
}

export default ViewSubCategory
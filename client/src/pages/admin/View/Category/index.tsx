import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CategoryCard from "../../../../components/CategoryCard";
import ItemCard from "../../../../components/ItemCard";
import NotFound from "../../../../components/NotFound";
import { RootState } from "../../../../store/store";
import { ItemProps } from "../../../../types";
import { API_MAIN_URL } from "../../../../utils/config";

const ViewCategory = () => {
    const { category } = useParams();
    const categories = useSelector((store: RootState) => store.category.categories);
    const currentCategory = categories.find((c) => c.name === category);
    const [items, setItems] = useState<ItemProps[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (categories.length) {
            (async () => {
                setItems((await axios.get(`${API_MAIN_URL}/${category}/items`)).data)
            })();
        }
    }, [categories, category])

    if (!currentCategory) return <NotFound subTitle="Kechirasiz kategoriya topilmadi" />

    return (
        <Flex vertical className='view-page view-category' gap={12}>
            <Flex className="banner" style={{ backgroundImage: `url(${currentCategory.img})` }}>
                <Typography.Title level={2}>{category?.toUpperCase()}</Typography.Title>
            </Flex>
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
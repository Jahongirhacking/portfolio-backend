import { Button, Divider, Empty, Flex, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../../components/CategoryCard";
import ItemCard from "../../../components/ItemCard";
import { RootState } from "../../../store/store";
import { ItemProps } from "../../../types";
import { API_MAIN_URL } from "../../../utils/config";

const Categories = () => {
    const categories = useSelector((store: RootState) => store.category.categories);
    const [items, setItems] = useState<ItemProps[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (categories.length) {
            (async () => {
                setItems((await axios.get(`${API_MAIN_URL}/items`)).data)
            })();
        }
    }, [categories])

    return (
        <Flex vertical gap={15}>
            <Flex gap={8} justify="space-between" align="center">
                <Typography.Title level={3} style={{ margin: 0 }}>Kategoriyalar</Typography.Title>
                <Button type="primary" onClick={() => { navigate('/admin/add/category') }}>Qo'shish</Button>
            </Flex>
            <Flex gap={12} wrap>
                {
                    categories.length
                        ? categories.map((c) => <CategoryCard category={c} onView={() => { navigate(`/admin/view/${c.name}`) }} />)
                        : <Empty description={"Kategoriyalar qo'shilmagan"} style={{ margin: 'auto' }} />
                }
            </Flex>
            <Divider />
            <Flex gap={8} justify="space-between" align="center">
                <Typography.Title level={3} style={{ margin: 0 }}>Loyihalar</Typography.Title>
                <Button type="primary" onClick={() => { navigate('/admin/add/item') }}>Qo'shish</Button>
            </Flex>
            <Flex gap={12} wrap>
                {
                    items.length
                        ? items.map((i) => <ItemCard item={i} onView={() => { navigate(`/admin/view/item/${i.id}`) }} />)
                        : <Empty description={"Loyihalar qo'shilmagan"} style={{ margin: 'auto' }} />
                }
            </Flex>
        </Flex>
    )
}

export default Categories
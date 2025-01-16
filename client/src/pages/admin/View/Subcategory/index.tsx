import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Empty, Flex, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ItemCard from "../../../../components/ItemCard"
import NotFound from "../../../../components/NotFound"
import { RootState } from "../../../../store/store"
import { ItemProps } from "../../../../types"
import { API_MAIN_URL } from "../../../../utils/config"

const ViewSubCategory = () => {
    const { category, subcategory } = useParams();
    const categories = useSelector((store: RootState) => store.category.categories);
    const currentCategory = categories.find((c) => c.name === category)?.categories.find((c) => c.name === subcategory);
    const [items, setItems] = useState<ItemProps[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (categories.length) {
            (async () => {
                setItems((await axios.get(`${API_MAIN_URL}/${subcategory}/items`)).data)
            })();
        }
    }, [categories, subcategory])

    if (!currentCategory) return <NotFound subTitle="Kechirasiz kategoriya topilmadi" />

    return (
        <Flex vertical gap={15}>
            <Flex gap={10} justify='space-between' align="center">
                <Typography.Title level={4} style={{ margin: 0 }}>{`${category?.toUpperCase()} > ${subcategory?.toUpperCase()}`}</Typography.Title>
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
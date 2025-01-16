import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Card, Flex, message, Typography } from "antd"
import axios from "axios"
import { useDispatch } from "react-redux"
import { fetchCategories } from "../store/slices/categorySlice"
import { AppDispatch } from "../store/store"
import { ICategory } from "../types"
import { API_MAIN_URL, AUTHORIZATION_HEADER } from "../utils/config"

const CategoryCard = ({ category, onView }: { category: ICategory, onView: () => void }) => {
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            if (window.confirm(`${category.name.toUpperCase()} kategoriyasini o'chirmoqchimisiz. Ichidagi barcha elementlar o'chib ketadi`)) {
                await axios.delete(`${API_MAIN_URL}/category/${category.id}`, AUTHORIZATION_HEADER);
                dispatch(fetchCategories());
                message.success("Muvaffaqiyatli o'chirildi")
            }
        } catch (err) {
            console.error(err);
            message.error("O'chirishda xatolik")
        }
    }

    return (
        <Card className="category-card" hoverable actions={[
            <Button type='primary' icon={<EyeOutlined />} onClick={onView} />,
            <Button
                danger
                type="primary"
                icon={<DeleteOutlined style={{ color: '#fff' }} />}
                onClick={onDelete}
            />
        ]}>
            <Flex vertical gap={8}>
                <Flex className="banner" style={{ backgroundImage: `url(${category.img})` }} onClick={onView}>
                    <Typography.Title level={5}>{category.name?.toUpperCase()}</Typography.Title>
                </Flex>
                <Flex justify='space-between'>
                    <Typography.Text>Loyiha:</Typography.Text>
                    <Typography.Text strong>{category.items.length}</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    )
}

export default CategoryCard
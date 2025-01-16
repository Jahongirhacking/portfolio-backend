import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Flex, message, Rate, Typography } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../store/slices/categorySlice';
import { AppDispatch } from '../store/store';
import { ItemProps } from '../types';
import { API_MAIN_URL, AUTHORIZATION_HEADER } from '../utils/config';

const ItemCard = ({ item, onView }: { item: ItemProps, onView: () => void }) => {
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            if (window.confirm(`${item.title.toUpperCase()} loyihasini o'chirmoqchimisiz. Ichidagi barcha elementlar o'chib ketadi`)) {
                await axios.delete(`${API_MAIN_URL}/items/${item.id}`, AUTHORIZATION_HEADER);
                dispatch(fetchCategories());
                message.success("Muvaffaqiyatli o'chirildi");
            }
        } catch (err) {
            console.error(err);
            message.error("O'chirishda xatolik");
        }
    }

    return (
        <Card className="item-card" hoverable actions={[
            <Button type='primary' icon={<EyeOutlined />} onClick={onView} />,
            <Button
                danger
                type="primary"
                icon={<DeleteOutlined style={{ color: '#fff' }} />}
                onClick={onDelete}
            />
        ]}>
            <Flex vertical gap={8}>
                <Flex className="banner" style={{ backgroundImage: `url(${item.img})` }} onClick={onView}>
                    <Typography.Title level={5}>{item.title?.toUpperCase()}</Typography.Title>
                </Flex>
                <Flex justify='space-between'>
                    <Typography.Text>Kategoriya:</Typography.Text>
                    <Typography.Text strong>{item?.category?.name}</Typography.Text>
                </Flex>
                <Flex justify='space-between'>
                    <Typography.Text>Reyting:</Typography.Text>
                    <Rate value={Number(item.rating)} disabled />
                </Flex>
            </Flex>
        </Card>
    )
}

export default ItemCard
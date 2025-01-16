import { Card, Flex, Typography } from 'antd'
import { ItemProps } from '../types'

const ItemCard = ({ item, onClick }: { item: ItemProps, onClick: () => void }) => {
    return (
        <Card className="item-card" hoverable onClick={onClick}>
            <Flex vertical gap={8}>
                <Flex className="banner" style={{ backgroundImage: `url(${item.img})` }}>
                    <Typography.Title level={5}>{item.title?.toUpperCase()}</Typography.Title>
                </Flex>
                <Flex justify='space-between'>
                    <Typography.Text>Kategoriya:</Typography.Text>
                    <Typography.Text strong>{item?.category?.name}</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    )
}

export default ItemCard
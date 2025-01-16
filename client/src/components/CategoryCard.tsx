import { Card, Flex, Typography } from "antd"
import { ICategory } from "../types"

const CategoryCard = ({ category, onClick }: { category: ICategory, onClick: () => void }) => {
    return (
        <Card className="category-card" hoverable onClick={onClick}>
            <Flex vertical gap={8}>
                <Flex className="banner" style={{ backgroundImage: `url(${category.img})` }}>
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
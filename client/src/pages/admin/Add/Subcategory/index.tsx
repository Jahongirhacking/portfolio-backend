import { Flex, Result, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../../store/store";

const AddSubCategory = () => {
    const { category } = useParams();
    const categories = useSelector((store: RootState) => store.category.categories);
    // const dispatch: AppDispatch = useDispatch();

    if (!categories.find(c => c.name === category)) return (
        <Result
            status="404"
            title="404"
            subTitle="Kechirasiz kategoriya topilmadi"
            extra={<Link to={'/admin/categories'}>Orqaga</Link>}
        />
    )

    return (
        <Flex vertical>
            <Typography.Title level={4}>{category?.toUpperCase()}</Typography.Title>
        </Flex>
    )
}

export default AddSubCategory
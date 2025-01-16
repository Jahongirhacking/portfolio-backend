import { Result } from "antd"
import { Link } from "react-router-dom"

const NotFound = ({ subTitle }: { subTitle: string }) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle={subTitle}
            extra={<Link to={'/admin/categories'}>Orqaga</Link>}
        />
    )
}

export default NotFound
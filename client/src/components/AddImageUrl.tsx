import { Form, Image, Input } from "antd"
import { Dispatch, SetStateAction } from "react"

const AddImageUrl = ({ label, img, setImg, disabled = false }: { label: string, img: string, setImg: Dispatch<SetStateAction<string>>, disabled?: boolean }) => {
    return (
        <Form.Item
            label={label}
            required
        >
            <Input disabled={disabled} value={img} onChange={({ target: { value } }) => setImg(value)} placeholder="rasm url" />
            <Image className="added-img" fallback="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg" src={img} alt="Kategoriya rasmi" />
        </Form.Item>
    )
}

export default AddImageUrl
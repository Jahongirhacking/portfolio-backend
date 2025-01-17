import { Flex, Form, Image, Input } from "antd"

const AddImageUrl = ({ label, img, setImg, disabled = false }: { label: string, img: string, setImg: (value: string) => void, disabled?: boolean }) => {
    return (
        <Form.Item
            label={label}
            required
        >
            <Flex gap={5} align='flex-start'>
                <Input disabled={disabled} value={img} onChange={({ target: { value } }) => setImg(value)} placeholder="rasm url" />
                <Image className="added-img" fallback="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg" src={img} alt="Kategoriya rasmi" />
            </Flex>
        </Form.Item>
    )
}

export default AddImageUrl
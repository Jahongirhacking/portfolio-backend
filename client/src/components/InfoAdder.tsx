import { DeleteOutlined, PaperClipOutlined } from "@ant-design/icons"
import { Button, Flex, Form, Input, Typography } from "antd"
import { Dispatch, SetStateAction } from "react"
import { InfoProps } from "../types"
import AddImageUrl from "./AddImageUrl"

const InfoAdder = ({ info, setInfo }: { info: InfoProps[], setInfo: Dispatch<SetStateAction<InfoProps[]>> }) => {
    return (
        <Flex vertical gap={8}>
            <Typography.Title level={5}>Ma'lumotlar</Typography.Title>
            <Button
                onClick={() => {
                    setInfo(prevInfo => [...prevInfo, { img: '', description: '' }])
                }}
                icon={<PaperClipOutlined />}
            >
                Ma'lumot qo'shish
            </Button>
            {
                info.map((i, index) => (
                    <Flex vertical className="info-form-item">
                        <Flex vertical gap={5}>
                            <Form.Item
                                label="Ma'lumot matni"
                                required
                            >
                                <Input.TextArea
                                    onChange={({ target: { value } }) => {
                                        setInfo(prevInfo => [
                                            ...prevInfo.slice(0, index),
                                            { ...prevInfo[index], description: value },
                                            ...prevInfo.slice(index + 1)
                                        ])
                                    }}
                                />
                            </Form.Item>
                            <AddImageUrl
                                label="Ma'lumot rasm url"
                                img={i.img}
                                setImg={(value) => {
                                    setInfo(prevInfo => [
                                        ...prevInfo.slice(0, index),
                                        { ...prevInfo[index], img: value as string },
                                        ...prevInfo.slice(index + 1)
                                    ])
                                }}
                            />
                        </Flex>
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined style={{ color: '#fff' }} />}
                            onClick={() => {
                                setInfo(prevInfo => [...prevInfo.slice(0, index), ...prevInfo.slice(index + 1)])
                            }}
                        />
                    </Flex>
                ))
            }
        </Flex>
    )
}

export default InfoAdder
import { DeleteOutlined, PaperClipOutlined } from "@ant-design/icons"
import { Button, Flex, Form, Input, Typography } from "antd"
import { Dispatch, SetStateAction } from "react"
import { InfoProps } from "../types"
import AddImageUrl from "./AddImageUrl"

const InfoAdder = ({ info, setInfo, disabled = false }: { info: InfoProps[], setInfo: Dispatch<SetStateAction<InfoProps[]>>, disabled?: boolean }) => {
    return (
        <Flex vertical gap={8}>
            <Typography.Title level={5}>Ma'lumotlar</Typography.Title>

            {!disabled && (<Button
                onClick={() => {
                    setInfo(prevInfo => [...prevInfo, { img: '', description: '' }])
                }}
                icon={<PaperClipOutlined />}
            >
                Ma'lumot qo'shish
            </Button>)}

            {
                info.map((i, index) => (
                    <Flex vertical className="info-form-item" key={index}>
                        <Flex vertical gap={5}>
                            <Form.Item
                                label="Ma'lumot matni"
                                required
                            >
                                <Input.TextArea
                                    disabled={disabled}
                                    value={i.description}
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
                                disabled={disabled}
                            />
                        </Flex>
                        {!disabled && (<Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined style={{ color: '#fff' }} />}
                            onClick={() => {
                                setInfo(prevInfo => [...prevInfo.slice(0, index), ...prevInfo.slice(index + 1)])
                            }}
                            style={{ marginLeft: 'auto' }}
                        />)}
                    </Flex>
                ))
            }
        </Flex>
    )
}

export default InfoAdder
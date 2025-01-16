import { DeleteOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Space, Typography } from 'antd'
import { Dispatch, SetStateAction } from 'react'

const LinksAdder = ({ links, setLinks, disabled = false }: { links: string[], setLinks: Dispatch<SetStateAction<string[]>>, disabled?: boolean }) => {
    return (
        <Flex vertical gap={8}>
            <Typography.Title level={5}>Linklar</Typography.Title>

            {!disabled && (<Button
                icon={<LinkOutlined />}
                onClick={() => {
                    setLinks(prevLinks => [...prevLinks, ''])
                }}
            >
                Link qo'shish
            </Button>)}

            {
                links.map((link, index) => (
                    <Space.Compact key={index}>
                        <Input
                            value={link}
                            onChange={({ target: { value } }) => {
                                setLinks(prevLinks => [...prevLinks.slice(0, index), value, ...prevLinks.slice(index + 1)])
                            }}
                            disabled={disabled}
                        />
                        {!disabled && (<Button
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                            onClick={() => {
                                setLinks(prevLinks => [...prevLinks.slice(0, index), ...prevLinks.slice(index + 1)])
                            }}
                        />)}
                    </Space.Compact>
                ))
            }
        </Flex>
    )
}

export default LinksAdder
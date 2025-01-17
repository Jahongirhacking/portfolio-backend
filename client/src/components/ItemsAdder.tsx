import { DeleteOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import AddImageUrl from "./AddImageUrl";

interface ItemsAdderProps<T extends Record<string, string | number>> {
    items: T[];
    setItems: Dispatch<SetStateAction<T[]>>;
    disabled?: boolean;
    config: { key: string, label: string, type: 'string' | 'image' | 'number' | 'textarea' }[];
    label?: string
}

const ItemsAdder = <T extends Record<string, string | number>>({ items, setItems, disabled = false, config, label = "Qo'shish" }: ItemsAdderProps<T>) => {
    return (
        <Flex vertical gap={8}>
            {!disabled && (<Button
                onClick={() => {
                    setItems(prevItems => [...prevItems, config.reduce((acc, curr) => ({ ...acc, [curr.key]: '' }), {}) as T])
                }}
                icon={<PaperClipOutlined />}
            >
                {label}
            </Button>)}

            {
                items.map((item, index) => (
                    <Flex vertical className="info-form-item" key={index}>
                        <Flex vertical gap={5}>
                            {
                                config.map(conf => (
                                    <React.Fragment key={conf.key}>
                                        {
                                            conf.type === 'image' ? (
                                                <AddImageUrl
                                                    label={conf.label}
                                                    img={item[conf.key] as string}
                                                    setImg={(value) => {
                                                        setItems(prevItems => [
                                                            ...prevItems.slice(0, index),
                                                            { ...prevItems[index], [conf.key]: value },
                                                            ...prevItems.slice(index + 1)
                                                        ])
                                                    }}
                                                    disabled={disabled}
                                                />
                                            ) : (
                                                <Form.Item
                                                    label={conf.label}
                                                    required
                                                >
                                                    <Input
                                                        type={conf.type}
                                                        disabled={disabled}
                                                        value={item[conf.key]}
                                                        onChange={({ target: { value } }) => {
                                                            setItems(prevItems => [
                                                                ...prevItems.slice(0, index),
                                                                { ...prevItems[index], [conf.key]: value },
                                                                ...prevItems.slice(index + 1)
                                                            ])
                                                        }}
                                                    />
                                                </Form.Item>
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </Flex>
                        {!disabled && (<Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined style={{ color: '#fff' }} />}
                            onClick={() => {
                                setItems(prevItems => [...prevItems.slice(0, index), ...prevItems.slice(index + 1)])
                            }}
                            style={{ marginLeft: 'auto' }}
                        />)}
                    </Flex>
                ))
            }
        </Flex>
    )
}

export default ItemsAdder
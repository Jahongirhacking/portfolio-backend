import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message, Select, Switch, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddImageUrl from "../../../../../components/AddImageUrl";
import InfoAdder from "../../../../../components/InfoAdder";
import LinksAdder from "../../../../../components/LinksAdder";
import NotFound from "../../../../../components/NotFound";
import { fetchCategories } from "../../../../../store/slices/categorySlice";
import { AppDispatch, RootState } from "../../../../../store/store";
import { InfoProps, ItemProps } from "../../../../../types";
import { getSubCategories } from "../../../../../utils/categoryUtil";
import { API_MAIN_URL } from "../../../../../utils/config";
import { getLocalStorage, localStorageNames } from "../../../../../utils/storageUtils";

const ViewItemDetails = () => {
    const params = useParams();
    const { itemId } = params;
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);
    const [info, setInfo] = useState<InfoProps[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [disabled, setDisabled] = useState(true);
    const categories = useSelector((store: RootState) => store.category.categories);
    const dispatch: AppDispatch = useDispatch();

    const options = getSubCategories(categories).map((c) => ({
        label: c?.name?.toUpperCase(),
        value: c?.name
    })) ?? []

    useEffect(() => {
        (async () => {
            try {
                const { data } = (await axios.get(`${API_MAIN_URL}/items/${itemId}`)) as { data: ItemProps };
                setTitle(data.title);
                setImg(data.img);
                setCategory(data.category.name);
                setInfo(data.info);
                setLinks(data.links);
                setRating(data.rating);
            } catch (err) {
                console.error(err);
            }
        })()
    }, [itemId, disabled]);

    const onSuccess = () => {
        dispatch(fetchCategories());
        setDisabled(true);
    }

    const handleSubmit = async () => {
        try {
            await axios.post(`${API_MAIN_URL}/items/${itemId}`, {
                title,
                img,
                category,
                info,
                links,
                rating
            }, {
                headers: {
                    Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                },
            });
            message.success("Muvaffaqiyatli o'zgartirldi");
            onSuccess();
        } catch (err) {
            message.error('Xatolik');
            console.error(err);
        }
    }

    if (!title) return <NotFound subTitle="Loyiha topilmadi" />

    return (
        <Flex vertical gap={12} className="item-details">
            <Flex className="banner" style={{ backgroundImage: `url(${img})` }}>
                <Typography.Title>{title}</Typography.Title>
            </Flex>
            <Flex gap={8}>
                <Typography.Text>O'zgartirish</Typography.Text>
                <Switch value={!disabled} onChange={() => setDisabled(prev => !prev)} />
            </Flex>
            <Form
                name="add-item-form"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Flex align="center" justify="space-between">
                    <Typography.Title level={4}>
                        Loyiha
                    </Typography.Title>
                    <Button htmlType="submit" type="primary" icon={<PlusCircleOutlined />} disabled={disabled}>Saqlash</Button>
                </Flex>
                <Form.Item
                    label={'Sarlavha'}
                    required
                >
                    <Input value={title} onChange={({ target: { value } }) => setTitle(value)} disabled={disabled} />
                </Form.Item>
                <Form.Item
                    label={'Kategoriya'}
                    required
                >
                    <Select
                        options={options}
                        value={category}
                        onChange={(value) => setCategory(value)}
                        disabled={disabled}
                    />
                </Form.Item>
                <AddImageUrl label="Loyiha rasm url" img={img} setImg={setImg} disabled={disabled} />
                <Form.Item
                    label={'Reyting'}
                    required
                >
                    <Input value={rating} onChange={({ target: { value } }) => setRating(Number(value))} type="number" max={5} min={0} placeholder="0...5" disabled={disabled} />
                </Form.Item>
                <Divider />
                <InfoAdder info={info} setInfo={setInfo} disabled={disabled} />
                <Divider />
                <LinksAdder links={links} setLinks={setLinks} disabled={disabled} />
            </Form>
        </Flex>
    )
}

export default ViewItemDetails
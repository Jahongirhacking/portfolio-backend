import { LockOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, message, Switch, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import AddImageUrl from "../../../../components/AddImageUrl";
import ItemsAdder from "../../../../components/ItemsAdder";
import { IProfile } from "../../../../types";
import { API_PROFILE_URL } from "../../../../utils/config";
import { getLocalStorage, localStorageNames } from "../../../../utils/storageUtils";

const ViewProfile = () => {
    const [disabled, setDisabled] = useState(true);
    const [profile, setProfile] = useState<IProfile>({});
    const [skills, setSkills] = useState<{ name: string, percent: number }[]>([]);
    const [services, setServices] = useState<{ name: string, description: string, icon: string }[]>([]);
    const [sites, setSites] = useState<{ logo: string }[]>([]);
    const [password, setPassword] = useState('');

    useEffect(() => {
        (async () => {
            try {
                if (getLocalStorage(localStorageNames.token)) {
                    const { data: { username } } = await axios.get(`${API_PROFILE_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                        },
                    });
                    const { services, skills, sites, cv, ...profileData } = (await axios.get(`${API_PROFILE_URL}/${username}`)).data;
                    setProfile({ ...profileData, ...cv });
                    setSkills(skills);
                    setServices(services);
                    setSites(sites);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [disabled])

    const changePassword = async () => {
        try {
            await axios.put(`${API_PROFILE_URL}/change-password`, { password }, {
                headers: {
                    Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                },
            });
            setPassword('');
            message.success("Parol o'zgardi")
        } catch (err) {
            message.error("Parolni o'zgartirishda xatolik")
            console.error(err);
        }
    }

    const clearInputs = () => {
        setSkills([]);
        setServices([]);
        setSites([]);
    }

    const handleSubmit = async () => {
        try {
            if (getLocalStorage(localStorageNames.token)) {
                const { profile_img, bio, link, ...profileData } = profile;
                await axios.post(`${API_PROFILE_URL}/me`, { ...profileData, cv: { profile_img, bio, link }, services, skills, sites }, {
                    headers: {
                        Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
                    },
                });
                setDisabled(true);
                clearInputs();
                message.success("Muvaffaqiyatli o'zgardi")
            }
        } catch (err) {
            message.error("O'zgartirishda xatolik")
            console.log(err);
        }
    }

    const setProfileValue = (key: string, value: string) => {
        setProfile(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <Flex vertical className="profile" gap={15}>
            <Flex className="main banner" style={{ backgroundImage: `url(${profile.background_img})` }}>
                <Typography.Title level={4}>{profile.name}</Typography.Title>
            </Flex>
            <Flex gap={10} wrap style={{ marginLeft: 'auto' }}>
                <Input value={profile.username} disabled style={{ width: 'auto' }} />
                <Input minLength={5} value={password} onChange={({ target: { value } }) => { setPassword(value) }} placeholder="yangi parol" style={{ width: 'auto' }} />
                <Button type="primary" disabled={password.length < 5} icon={<LockOutlined />} onClick={changePassword} />
            </Flex>
            <Form
                name="profile-from"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Flex justify="space-between">
                    <Flex gap={10}>
                        <Typography.Text>O'zgartirish</Typography.Text>
                        <Switch value={!disabled} onChange={() => setDisabled(prev => !prev)} />
                    </Flex>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} disabled={disabled}>Saqlash</Button>
                </Flex>
                <Form.Item
                    label='Ism Familiya'
                    required
                >
                    <Input value={profile.name} disabled={disabled} />
                </Form.Item>
                <AddImageUrl label="Orqa fon" img={profile?.background_img ?? ''} setImg={(value) => { setProfileValue('background_img', value) }} disabled={disabled} />
                <Form.Item
                    label="Qisqa ma'lumot"
                    required
                >
                    <Input value={profile.short_info} onChange={({ target: { value } }) => { setProfileValue('short_info', value) }} disabled={disabled} />
                </Form.Item>
                <Divider>CV / Obyektivka</Divider>
                <AddImageUrl label={'3x4 rasm'} img={profile.profile_img ?? ''} setImg={(value) => { setProfileValue('profile_img', value) }} disabled={disabled} />
                <Form.Item
                    label="Bio"
                    required
                >
                    <Input.TextArea value={profile.bio} onChange={({ target: { value } }) => { setProfileValue('bio', value) }} disabled={disabled} />
                </Form.Item>
                <Form.Item
                    label="CV link"
                    required
                >
                    <Input value={profile.link} onChange={({ target: { value } }) => { setProfileValue('link', value) }} disabled={disabled} />
                </Form.Item>
                <Divider>Xizmatlar</Divider>
                <ItemsAdder items={services} setItems={setServices} config={[
                    { key: 'name', label: 'Xizmat nomi', type: 'string' },
                    { key: 'icon', label: 'Xizmat rasmi', type: 'image' },
                    { key: 'description', label: 'Xizmat haqida', type: 'string' },
                ]} disabled={disabled} />
                <Divider>Skill</Divider>
                <ItemsAdder items={skills} setItems={setSkills} config={[
                    { key: 'name', label: 'Skill nomi', type: 'string' },
                    { key: 'percent', label: 'Skill foizi', type: 'number' },
                ]} disabled={disabled} />
                <Divider>Freelance saytlar</Divider>
                <ItemsAdder items={sites} setItems={setSites} config={[
                    { key: 'logo', label: 'Sayt rasm', type: 'image' }
                ]} disabled={disabled} />
            </Form>
        </Flex>
    )
}

export default ViewProfile
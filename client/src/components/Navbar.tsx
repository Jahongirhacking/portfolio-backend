import { HomeOutlined, LogoutOutlined, PlusCircleOutlined, UserOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Flex, Menu, MenuProps } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../store/slices/categorySlice';
import { AppDispatch, RootState } from '../store/store';
import { localStorageNames } from '../utils/storageUtils';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = (props: React.HTMLAttributes<HTMLDivElement>) => {
    const categories = useSelector((store: RootState) => store.category.categories);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories()); // Dispatch the async action to fetch categories
    }, [dispatch]);

    const navbarItems: MenuItem[] = [
        {
            key: 'category',
            label: <Link to={'/admin/view/categories'}>Kategoriyalar</Link>,
            icon: <Link to={'/admin/view/categories'}><HomeOutlined /></Link>,
            children: [
                ...categories.map(c => ({
                    key: c.id,
                    label: <Link to={`/admin/view/${c.name}`}>{c.name.toUpperCase()}</Link>,
                    icon: <img src={c.img} width={50} onClick={() => { navigate(`/admin/view/${c.name}`) }} />,
                    children: [
                        ...c.categories.map(sc => ({
                            key: sc.id,
                            label: <Link to={`/admin/view/${c.name}/${sc.name}`}>{sc.name.toUpperCase()}</Link>,
                            icon: <img src={sc.img} width={50} onClick={() => { navigate(`/admin/view/${c.name}/${sc.name}`) }} />
                        })),
                        {
                            key: `add-btn-${c.id}`,
                            label: (
                                <Button
                                    type='link'
                                    icon={<PlusCircleOutlined />}
                                    onClick={() => {
                                        navigate(`/admin/add/${c.name}/subcategory`)
                                    }}
                                >
                                    Subkategoriya qo'shish
                                </Button>
                            ),
                        }
                    ]
                })),
                {
                    key: 'add-btn',
                    label: (
                        <Button
                            type='link'
                            icon={<PlusCircleOutlined />}
                            onClick={() => {
                                navigate('/admin/add/category')
                            }}
                        >
                            Kategoriya qo'shish
                        </Button>
                    ),
                }
            ]
        },
        {
            key: 'profile',
            label: <Link to={'/admin/view/profile'}>Profil</Link>,
            icon: <UserOutlined />
        },
        {
            key: 'live',
            label: <a href={'https://tursunaliyev-portfolio.netlify.app/'}>Live</a>,
            icon: <WifiOutlined />
        },
        {
            key: 'exit',
            label: <Link to={'/'} onClick={() => { localStorage.removeItem(localStorageNames.token); window.location.reload() }}>Chiqish</Link>,
            icon: <LogoutOutlined />
        }
    ]
    return (
        <Flex vertical {...props}>
            <Menu
                items={navbarItems}
                mode='inline'
                defaultOpenKeys={['category']}
            />
        </Flex>
    )
}

export default Navbar
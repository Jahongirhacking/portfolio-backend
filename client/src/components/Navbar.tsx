import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Menu, MenuProps } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../store/slices/categorySlice';
import { AppDispatch, RootState } from '../store/store';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = () => {
    const categories = useSelector((store: RootState) => store.category.categories);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories()); // Dispatch the async action to fetch categories
    }, [dispatch]);

    const navbarItems: MenuItem[] = [
        {
            key: 'category',
            label: 'Kategoriyalar',
            icon: <HomeOutlined />,
            children: [
                ...categories.map(c => ({
                    key: c.id,
                    label: c.name.toUpperCase(),
                    icon: <img src={c.img} width={40} />,
                    children: [
                        ...c.categories.map(sc => ({
                            key: sc.id,
                            label: sc.name.toUpperCase(),
                            icon: <img src={sc.img} width={40} />
                        })),
                        {
                            key: 'btn1',
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
                    key: 'btn2',
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
        }
    ]
    return (
        <Flex className='navbar' vertical>
            <Menu
                items={navbarItems}
                mode='inline'
            />
        </Flex>
    )
}

export default Navbar
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button, Affix} from 'antd';
import {
    MenuOutlined,
    StarOutlined,
    TeamOutlined,
    MenuFoldOutlined,
    MailOutlined,
    AppstoreOutlined,
    DashboardOutlined,
    ScheduleOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;



const Sidebar = ({ container}) => {
    const [collapsed, setCollaspsed] = useState(false);
    const [current, setCurrent] = useState(1);


    const toggleCollapsed = () => {
        setCollaspsed(!collapsed);
    };
    const handelClick = e => {
        setCurrent(e.key)
    }
    return (
            <Affix offsetTop={10} target={() => container}>
        <div className="sidebar" >
            <Button type="primary" onClick={toggleCollapsed} className="btnToggle">
                {React.createElement(collapsed ? MenuOutlined : MenuFoldOutlined)}
            </Button>
            <div className="menuSide">
                <MenuOutlined />
                <span>القائمة</span>
            </div>
            
            <Menu
                mode="inline"
                theme="light"
                collapsed={`${collapsed}`}
                className={collapsed ? 'showSide' : 'hideSide'}
                defaultSelectedKeys={[current]}
                onClick={handelClick}
            >
                    <Menu.Item key={1} icon={<DashboardOutlined />} >
                    <Link to="/dashboard"> لوحة التحكم</Link>
                </Menu.Item>
                    <SubMenu key={2} icon={<MailOutlined />} title="المنتجات">
                    <Menu.Item key={3}>  <Link to="/admin/products"> جميع المنتجات</Link></Menu.Item>
                    <Menu.Item key={4}> <Link to="/admin/product/new">اضافة منتج</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key={5} icon={<ScheduleOutlined />}>
                    <Link to="/admin/orders"> الطلبات</Link>
                </Menu.Item>
                <Menu.Item key={6} icon={<TeamOutlined />}>
                    <Link to="/admin/users"> المستخدمين</Link>
                </Menu.Item>
                <Menu.Item key={7} icon={<StarOutlined />}>
                    <Link to="/admin/reviews">المراجعات</Link>
                </Menu.Item>
                <Menu.Item key={8} icon={<AppstoreOutlined />}>
                    <Link to="/admin/categories"> الاقسام</Link>
                </Menu.Item>

                </Menu>
        </div>
            </Affix>

    )
}

export default Sidebar

import { Menu, Dropdown, Button } from 'antd';
import {
    DownOutlined,
    ShoppingOutlined,
    UserOutlined,
    LogoutOutlined,
    DashboardOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import Search from "../../search/Search";
import "./navbar.css";
import imgPreview from "../../../res/images/logo/logo-tasawq.png";



const RightMenu = ({
    cartItems,
    isAuthenticated,
    user,
    handleLogout
}) => {
    const menu = (
        <Menu className="subMenu">
            {isAuthenticated && user && user.role === 'admin' && (
                <Menu.Item key="1">
                    <DashboardOutlined />
                    <Link to="/dashboard" className="text-decoration-none cart-link">
                        لوحة التحكم
                    </Link>
                </Menu.Item>
            )}

            <Menu.Item key="2">
                <ScheduleOutlined />
                <Link to="/orders/me" className="text-decoration-none cart-link">
                    طلباتي
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <UserOutlined />
                <Link to="/users/profile/me" className="text-decoration-none cart-link">
                    البروفايل
                </Link>
            </Menu.Item>
            <Menu.Item key="4">
                <LogoutOutlined />
                <Link to="/" className="text-decoration-none cart-link" onClick={handleLogout}>
                    تسجيل خروج
                </Link>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="userMenu">
            <div className="cart">
                <Link to="/cart" className="text-decoration-none cartLink">
                    <ShoppingOutlined className="cartIcon" />
                    <span className="cartCount" id="cart_count">
                        {cartItems.length >= 99 ? ` 99+` : cartItems.length || 0}
                    </span>
                </Link>
            </div>
            <div className="smMenu">
                <div className="showInPhone"><Search /></div>
                {isAuthenticated ?
                    <Dropdown overlay={menu}>
                        <div className="userNav">
                            <div className="userImage">
                                {user&& user.avatar?
                                <img
                                    src={user && user.avatar.url}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                />
                                    : <img src={imgPreview} alt={user && user.name}
                                        className="rounded-circle"
                                    />}
                            </div>
                            <span className="userName">{user && user.name.substring(0, 3)}..</span><DownOutlined />
                        </div>
                    </Dropdown> :
                    (
                        !user && (<div> <Link to="/users/login" className="loginAnc showInPhone"><UserOutlined className="userIconSm" /></Link>
                            <Button size="large" type="primary" ghost className="  showInLarge">
                                <Link to="/users/login" className="loginAnc">تسجيل دخول</Link>
                            </Button></div>)


                    )}
            </div>


        </div>
    );
}

export default RightMenu;



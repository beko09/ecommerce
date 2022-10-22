import { useState, useEffect } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button, Affix } from 'antd';
import { Link } from "react-router-dom";
import logo from "../../../res/images/logo/logo-tasawq.png"
import {
    useDispatch,
    useSelector
} from "react-redux";
import { logout } from "../../../redux/actions/user";
import "./navbar.css";
import {
    getAdminCategories
} from '../../../redux/actions/category'

const Navbar = () => {

    const dispatch = useDispatch();


    const { loading, isAuthenticated, user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart)
    const { categories } = useSelector(state => state.allCategories);


    const handleLogout = () => {
        dispatch(logout());

    }
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    useEffect(() => {
        dispatch(getAdminCategories())
    }, [dispatch])
    return (
        <Affix offsetTop={.0003}>
            <nav >
                <div className="container">
                    <div className="menuBar">
                        <div className="logo">
                            <Link to="/">
                                <img src={logo} alt="logo" />
                            </Link>

                        </div>
                        <div className="menuCon">
                            <div className="leftMenu">
                                <LeftMenu
                                    categories={categories}
                                />

                            </div>
                            <div className="rightMenu">
                                <RightMenu
                                    cartItems={cartItems}
                                    isAuthenticated={isAuthenticated}
                                    user={user?.user}
                                    handleLogout={handleLogout}
                                    loading={loading}
                                />
                                <Button className="barsMenu" onClick={showDrawer}>
                                    <span className="barsBtn"></span>
                                </Button>
                            </div>
                            <Drawer
                                title={<Link to="/">
                                    <img src={logo} alt="logo" />
                                </Link>}
                                placement="right"
                                closable={false}
                                onClose={onClose}
                                visible={visible}
                            >
                                <LeftMenu
                                    categories={categories}
                                />

                            </Drawer>

                        </div>
                    </div>
                </div>
            </nav>
        </Affix>

    )
}

export default Navbar;











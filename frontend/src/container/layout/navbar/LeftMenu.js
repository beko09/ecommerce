import { Menu, Grid } from 'antd';
import { Link } from "react-router-dom";

import Search from "../../../container/search/Search";
import "./navbar.css";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = ({ categories}) => {
    const { md} = useBreakpoint()
    
    return (
        <Menu mode={md ? "horizontal" : "inline"} className="menuLg">
            <Menu.Item key="mail">
                <Link to="/">الريئسية</Link>
            </Menu.Item>
            <SubMenu key="sub1" title={<span>الاقسام</span>}>
                <MenuItemGroup placement="bottomLeft">
                    {categories ? categories.map((category,i) => (
                        <Menu.Item key={i}>
                            <Link to={`/products/category/${category._id}`}>
                            {category.name}
                            </Link>
                            
                        </Menu.Item>
                      )):<p>لا توجد اقسام</p>}
                </MenuItemGroup>

            </SubMenu>
            <Menu.Item key="test">
                <Link to="/contact">اتصل بنا</Link>
            </Menu.Item>
            <Menu.Item key="alipay1">
                <div className="showInLarge"><Search /></div>
            </Menu.Item>
        </Menu>
    );
}

export default LeftMenu;
import React, { useState } from "react";
import {
    AppstoreFilled,
    HomeFilled,
    ShoppingFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import logo from "../../../icons/logo.svg";
import { LinkingWrapper, StyledHeader } from "./Layout.styled";
import {Link } from "react-router-dom"

const items = [
    {
        label: (<Link to="/">Home</Link>),
        key: 'home',
        icon: <HomeFilled  />
    },
    {
        label: (<Link to="/catalog">Catalog</Link>),
        key: 'catalog',
        icon: <AppstoreFilled />
    },
    {
        label: (<Link to="/cart">Cart</Link>),
        key: 'cart',
        icon: <ShoppingFilled />
    }
];

function Layout() {
    const [currentPage, setCurrentPage] = useState('home');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrentPage(e.key);
    };
    
    return (
        <StyledHeader>
            <img src={logo} alt="" width={100} />

            <LinkingWrapper>
                <Menu 
                    onClick={onClick} 
                    selectedKeys={[]} 
                    mode="horizontal" 
                    defaultSelectedKeys={['home']}
                    items={items}
                />
            </LinkingWrapper>
        </StyledHeader>
    );
}

export default Layout;

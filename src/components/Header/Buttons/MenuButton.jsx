import React from "react";
import 'antd/dist/antd.css';
import * as Styled from './MenuButton.styled'

const MenuButton = () => {

    return (
        <div>
            <Styled.MenuButton type="ghost" icon={<Styled.MenuIcon/>} size = "large"/>
        </div>
    )};

export default MenuButton;
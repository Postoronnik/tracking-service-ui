import React from "react";
import * as Styles from './Header.styled';
import {HeaderCard} from "../wrapers/HeaderCard.styled";
import MenuButton from "./Buttons/MenuButton";

const Header = () => {
    return (
        <HeaderCard>
            <Styles.Header>
                <MenuButton/>
                <label>Patients Heath Tracker</label>
            </Styles.Header>
        </HeaderCard>
    )};

export default Header;
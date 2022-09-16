import React, {FC, useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AppContext} from "../context";
import {useCart} from "./hooks/useCart";

type HeaderType = {
    onclickOpenCart: () => void
}

export const Header: FC<HeaderType> = ({onclickOpenCart}) => {
    const {totalPrice} = useCart()
    return (
        <header>
                <div className="headerLeft">
                     <NavLink to="/">
                    <img width={40} height={40} src="./img/logo.png" alt="Logo"/>
                     </NavLink>
                    <div>
                        <h3>React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>

            <ul className="headerRight">
                <li onClick={onclickOpenCart}>
                    <img width={18} height={18} src="./img/cart.svg" alt="Cart"/>
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <NavLink to="/favorites">
                        <img width={18} height={18} src="./img/heart.svg" alt="Heart"/>
                    </NavLink>
                </li>
                <li>
                    <img width={18} height={18} src="./img/user.svg" alt="User"/>
                </li>
            </ul>
        </header>
    );
};



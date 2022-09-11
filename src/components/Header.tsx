import React, {FC} from 'react';
import logo from '../image/logo.png';
import cart from '../image/cart.svg';
import user from '../image/user.svg';

type HeaderType = {
    onclickOpenCart: () => void
    }

export const Header:FC<HeaderType> = ({onclickOpenCart}) => {
    return (
        <header>
            <div className="headerLeft">
                <img width={40} height={40} src={logo} alt="Logo"/>
                <div>
                    <h3>React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="headerRight">
                <li onClick={onclickOpenCart}>
                    <img width={18} height={18} src={cart}  alt="Cart"/>
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img width={18} height={18} src={user} alt="User"/>
                </li>
            </ul>
        </header>
    );
};



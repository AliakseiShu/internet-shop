import React, {FC} from 'react';

type HeaderType = {
    onclickOpenCart: () => void
    }

export const Header:FC<HeaderType> = ({onclickOpenCart}) => {
    return (
        <header>
            <div className="headerLeft">
                <img width={40} height={40} src="./img/logo.png" alt="Logo"/>
                <div>
                    <h3>React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="headerRight">
                <li onClick={onclickOpenCart}>
                    <img width={18} height={18} src="./img/cart.svg"  alt="Cart"/>
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img width={18} height={18} src="./img/heart.svg" alt="Heart"/>
                </li>
                <li>
                    <img width={18} height={18} src="./img/user.svg" alt="User"/>
                </li>
            </ul>
        </header>
    );
};



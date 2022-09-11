import React, {FC} from 'react';
import btnRemove from '../image/btn-remove.svg';
import arrow from '../image/arrow.svg';

type DrawerType = {
    onclickClose: () => void
}

export const Drawer:FC<DrawerType> = ({onclickClose}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2>Корзина <img className="cartItemRemove" src={btnRemove} alt="Btn-remove" onClick={onclickClose}/></h2>
                <div className="items">
                    <div className="cartItem">
                        <img width={70} height={70} src="/public/assets/sneakers/2.jpg" alt="Sneakers"/>
                        <div className="item">
                            <p>Мужские Кроссовки Nike Air Max 270</p>
                            <b>12 999 руб.</b>
                        </div>
                        <img className="cartItemRemove" src={btnRemove} alt="Btn-remove"/>
                    </div>
                    <div className="cartItem">
                        <img width={70} height={70} src="/public/assets/sneakers/2.jpg" alt="Sneakers"/>
                        <div className="item">
                            <p>Мужские Кроссовки Nike Air Max 270</p>
                            <b>12 999 руб.</b>
                        </div>
                        <img className="cartItemRemove" src={btnRemove} alt="Btn-remove"/>
                    </div>
                </div>
                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб.</b>
                        </li>
                        <li>
                            <span>Налог 5%</span>
                            <div></div>
                            <b>1074 руб.</b>
                        </li>
                    </ul>
                    <button className="greenButton">Оформить заказ <img src={arrow} alt="Arrow"/>
                    </button>
                </div>
            </div>
        </div>
    );
};


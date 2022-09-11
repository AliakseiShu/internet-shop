import React, {FC} from 'react';

type DrawerType = {
    onclickClose: () => void
}

export const Drawer:FC<DrawerType> = ({onclickClose}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2>Корзина <img className="cartItemRemove" src="./img/btn-remove.svg" alt="Btn-remove" onClick={onclickClose}/></h2>
                <div className="items">
                    <div className="cartItem">
                        <img width={70} height={70} src="./img/sneakers/1.jpg" alt="Sneakers"/>
                        <div className="item">
                            <p>Мужские Кроссовки Nike Air Max 270</p>
                            <b>12 999 руб.</b>
                        </div>
                        <img className="cartItemRemove" src="./img/btn-remove.svg" alt="Btn-remove"/>
                    </div>
                    <div className="cartItem">
                        <img width={70} height={70} src="./img/sneakers/2.jpg" alt="Sneakers"/>
                        <div className="item">
                            <p>Мужские Кроссовки Nike Air Max 270</p>
                            <b>12 999 руб.</b>
                        </div>
                        <img className="cartItemRemove" src="./img/btn-remove.svg" alt="Btn-remove"/>
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
                    <button className="greenButton">Оформить заказ <img src="./img/arrow.svg" alt="Arrow"/>
                    </button>
                </div>
            </div>
        </div>
    );
};


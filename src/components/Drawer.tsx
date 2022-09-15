import React, {FC} from 'react';
import {ItemType} from "../App";

type DrawerType = {

    onclickClose: () => void
    onRemoveCart: (id: string) => void
    cartItems: ItemType[]
}

export const Drawer: FC<DrawerType> = ({onclickClose, cartItems, onRemoveCart}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2>Корзина<img className="cartItemRemove" src="./img/btn-remove.svg" alt="Btn-remove"
                                onClick={onclickClose}/></h2>
                {cartItems.length > 0
                    ? <div>
                        <div className="items">
                            {cartItems.map((item, index) => (
                                <div className="cartItem" key={index}>
                                    <img width={70} height={70} src={item.imageUrl} alt="Sneakers"/>
                                    <div className="item">
                                        <p>{item.title}</p>
                                        <b>{item.price}</b>
                                    </div>
                                    <img className="cartItemRemove" onClick={() => onRemoveCart(item.id)}
                                         src="./img/btn-remove.svg" alt="Btn-remove"/>
                                </div>
                            ))}
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
                    : <div className="cartEmpty">
                        <img className="emptyImage" src="/img/empty-cart.jpg" alt="EmptyCart"/>
                        <p>Добавьте хотя бы одну пару кроссовок, стобы сделать заказ.</p>
                        <button onClick={onclickClose} className="greenButton">
                            <img className="imgArrow" src="/img/arrow.svg" alt="Arrow" />Вернуться назад
                        </button>
                    </div>
                }



            </div>
        </div>
    );
};


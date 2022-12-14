import React, {FC, useState} from 'react';
import axios from "axios";

import {Info} from "../Info/Info";
import {useCart} from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

type DrawerType = {
    onclickClose: () => void
    onRemoveCart: (id: string) => void
    opened: boolean
}

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Drawer: FC<DrawerType> = ({onclickClose, onRemoveCart, opened}) => {

    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {cartItems,setCartItems,totalPrice} = useCart()

    const onclickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://631dce89cc652771a48ba100.mockapi.io/orders',
                {items: cartItems})
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems && setCartItems([])

            for (let i = 0; i < Number(cartItems && cartItems.length); i++) {
                const item = cartItems && cartItems[i]
                 await axios.delete(`https://631dce89cc652771a48ba100.mockapi.io/cart/` + item?.id)
                await delay(1000)
            }
        } catch (e) {
            alert("Ошибка при создании заказа :(")
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2>Корзина<img className="cartItemRemove" src="img/btn-remove.svg" alt="Btn-remove"
                                onClick={onclickClose}/></h2>
                {cartItems && cartItems.length > 0
                    ? <div className="cartItemsBlock">
                        <div className="items">
                            {cartItems.map((item, index) => (
                                <div className="cartItem" key={index}>
                                    <img width={70} height={70} src={item.imageUrl} alt="Sneakers"/>
                                    <div className="item">
                                        <p>{item.title}</p>
                                        <b>{item.price}</b>
                                    </div>
                                    <img className="cartItemRemove" onClick={() => onRemoveCart(item.id)}
                                         src="img/btn-remove.svg" alt="Btn-remove"/>
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%</span>
                                    <div></div>
                                    <b>{totalPrice && totalPrice * 0.05} руб.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onclickOrder} className="greenButton">Оформить
                                заказ <img
                                    src="img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                    : (
                        <Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
                              description={isOrderComplete
                                  ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке`
                                  : "Добавьте хотя бы одну пару кроссовок, стобы сделать заказ."}
                              image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
                              onclickClose ={onclickClose}
                        />
                    )}
            </div>
        </div>
    );
};


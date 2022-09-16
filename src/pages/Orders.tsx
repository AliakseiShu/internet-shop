import React, {useContext, useEffect, useState} from 'react';
import {Card} from "../components/Card";
import {AppContext} from "../context";
import axios from "axios";
import {ItemType} from "../App";


export const Orders = () => {
    const [orders, setOrders] = useState<ItemType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://631dce89cc652771a48ba100.mockapi.io/orders')
                setOrders(data.reduce((prev: ItemType[], obj: { items: ItemType[] }) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.log(error)
            }
        })()
    }, [])

    const {onAddToFavorite, onAddToCart} = useContext(AppContext)

    return (
        <div className="content">
            <div className="contentWrapper">
                <h1>Мои заказы</h1>
            </div>
            <div className="sneakers">
                {(
                    isLoading
                        ? Array(8).fill("")
                        : orders).map((item, index) =>
                    <Card
                        key={index}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        isReady={isLoading}
                    />)}
            </div>
        </div>
    );
};

import React, {useEffect, useState} from 'react';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {Card} from "./components/Card";

export type ItemsType = {
    imageUrl: string
    title: string
    price: number
}

export function App() {

    const [items, setItems] = useState<ItemsType[]>([])
    const [cartItems, setCartItems] = useState<ItemsType[]>([])
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        fetch('https://631dce89cc652771a48ba100.mockapi.io/items').then((res) => {
            return res.json()
        })
            .then(json => setItems(json))

    }, [])

    const onAddToCart = (obj: ItemsType) => {
        setCartItems([...cartItems,obj])
    }

    return (
        <div className="wrapper">
            {cartOpened && <Drawer cartItems={cartItems} onclickClose={() => setCartOpened(false)}/>}
            <Header
                onclickOpenCart={() => setCartOpened(true)}
            />
            <div className="content">
                <div className="contentWrapper">
                    <h1>Все кроссовки</h1>
                    <div className="searchBlock">
                        <img src="./img/search.svg" alt="Search"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="sneakers">
                    {items.map((item, index) => <Card
                        key={index}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        onClickFavorite={() => console.log('Добавили закладки')}
                        onClickPlus={(obj) => onAddToCart(obj)}
                    />)}
                </div>
            </div>
        </div>
    );
}


import React, {ChangeEvent, useEffect, useState} from 'react';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {Card} from "./components/Card";
import axios from "axios";

export type ItemsType = {
    id: string
    imageUrl: string
    title: string
    price: number
}

export function App() {

    const [items, setItems] = useState<ItemsType[]>([])
    const [cartItems, setCartItems] = useState<ItemsType[]>([])
    const [favorites, setFavorites] = useState<ItemsType[]>([])
    const [cartOpened, setCartOpened] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        axios.get('https://631dce89cc652771a48ba100.mockapi.io/items').then((res) => {
            setItems(res.data)
        })
        axios.get('https://631dce89cc652771a48ba100.mockapi.io/cart').then((res) => {
            setCartItems(res.data)
        })
        axios.get('https://631dce89cc652771a48ba100.mockapi.io/favorites').then((res) => {
            setFavorites(res.data)
        })
    }, [])

        const onAddToCart = (obj: ItemsType) => {
        axios.post('https://631dce89cc652771a48ba100.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj])
    }
    const onRemoveCart = (id: string) => {
        axios.delete(`https://631dce89cc652771a48ba100.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter((item) => item.id !== id))
    }
    const onAddToFavorite = (obj: ItemsType) => {
        axios.post(`https://631dce89cc652771a48ba100.mockapi.io/favorites`, obj)
        setFavorites((prev) => [...prev, obj])
    }

    const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    const oncClearSearchInput = () => {
        setSearchValue('')
    }

    const onclickClose = () => {
        setCartOpened(!cartOpened)
    }

    return (
        <div className="wrapper">
            {cartOpened && <Drawer
                onRemoveCart={onRemoveCart}
                cartItems={cartItems}
                onclickClose={onclickClose}/>}
            <Header
                onclickOpenCart={onclickClose}
            />
            <div className="content">
                <div className="contentWrapper">
                    <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
                    <div className="searchBlock">
                        <img src="./img/search.svg" alt="Search"/>
                        <input value={searchValue}
                               onChange={onChangeSearchInput}
                               placeholder="Поиск..."/>
                        {searchValue &&
                            <img onClick={oncClearSearchInput}
                                 className="clear"
                                 src="./img/btn-remove.svg"
                                 alt="Clear"/>}
                    </div>
                </div>
                <div className="sneakers">
                    {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item, index) =>
                        <Card
                            key={index}
                            id={item.id}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            onClickFavorite={(obj) => onAddToFavorite(obj)}
                            onClickPlus={(obj) => onAddToCart(obj)}

                        />)}
                </div>
            </div>
        </div>
    );
}


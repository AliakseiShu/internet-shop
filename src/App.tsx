import React, {useEffect, useState} from 'react';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";

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

    /*   const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
           setSearchValue(event.currentTarget.value)
       }

       const oncClearSearchInput = () => {
           setSearchValue('')
       }*/

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
            <Routes>
                <Route path="/" element={
                    <Home items={items}
                          onAddToCart={onAddToCart}
                          onAddToFavorite={onAddToFavorite}
                    />
                }/>
                <Route path={'/favorites'} element={
                    <Favorites/>}/>
                <Route path={'/*'} element={<div>404</div>}/>
            </Routes>
        </div>
    );
}


import React, {useEffect, useState} from 'react';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";
import {Page404} from "./pages/Page404";

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
    const onAddToFavorite = async (obj: ItemsType) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://631dce89cc652771a48ba100.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter(el => el.id !== obj.id))
            } else {
                const {data} = await axios.post(`https://631dce89cc652771a48ba100.mockapi.io/favorites`, obj)
                setFavorites((prev) => [...prev, data])
            }
        } catch (error) {
            alert("Error")
        }
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
            <Routes>
                <Route path="/" element={
                    <Home items={items}
                          onAddToCart={onAddToCart}
                          onAddToFavorite={onAddToFavorite}
                    />
                }/>
                <Route path={'/favorites'} element={
                    <Favorites favorites={favorites}
                               onAddToFavorite={onAddToFavorite}
                    />
                }/>
                <Route path={'/*'} element={<Page404/>}/>
            </Routes>
        </div>
    );
}


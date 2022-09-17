import React, {useEffect, useState} from 'react';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer/Drawer";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";
import {Page404} from "./pages/Page404";
import {AppContext} from './context';
import {Orders} from "./pages/Orders";

export type ItemType = {
    id: string
    parentId: string
    imageUrl: string
    title: string
    price: number
}

export function App() {
    const [items, setItems] = useState<ItemType[]>([])
    const [cartItems, setCartItems] = useState<ItemType[]>([])
    const [favorites, setFavorites] = useState<ItemType[]>([])
    const [cartOpened, setCartOpened] = useState(false)
    const [isReady, setIsReady] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://631dce89cc652771a48ba100.mockapi.io/cart'),
                    axios.get('https://631dce89cc652771a48ba100.mockapi.io/favorites'),
                    axios.get('https://631dce89cc652771a48ba100.mockapi.io/items'),
                ])
                setIsReady(false)
                setCartItems(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setItems(itemsResponse.data)
            } catch (e) {
                alert('Ошибка при запросе данных')
                console.error(e)
            }
        }

        fetchData()
    }, [])

    const onAddToCart = async (obj: ItemType) => {
        try {
            if (cartItems.find(cartObj => cartObj.parentId === obj.id)) {
                axios.delete(`https://631dce89cc652771a48ba100.mockapi.io/cart/${obj.id}`)
                setCartItems((prev: ItemType[]) => prev.filter((item) => item.parentId !== obj.id))
            } else {
                const {data} = await axios.post('https://631dce89cc652771a48ba100.mockapi.io/cart', obj)
                setCartItems((prev: ItemType[]) => [...prev, data])
            }
        } catch (e) {
            alert('Не получилось добавить в корзину')
            console.error(e)
        }
    }

    const onRemoveCart = (id: string) => {
        try {
            axios.delete(`https://631dce89cc652771a48ba100.mockapi.io/cart/${id}`)
            setCartItems(prev => prev.filter((item) => item.id !== id))
        } catch (e) {
            alert('Ошибка при удалении из корзины')
            console.error(e)
        }
    }

    const onAddToFavorite = async (obj: ItemType) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://631dce89cc652771a48ba100.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter(el => el.id !== obj.id))
            } else {
                const {data} = await axios.post(`https://631dce89cc652771a48ba100.mockapi.io/favorites`, obj)
                setFavorites((prev) => [...prev, data])
            }
        } catch (e) {
            alert("Error")
            console.error(e)
        }
    }

    const onclickClose = () => {
        setCartOpened(!cartOpened)
    }

    const isItemAdded = (id: string) => {
        return cartItems.some((item) => item.parentId === id)
    }

    return (
        <AppContext.Provider value={{
            favorites,
            items,
            cartItems,
            isItemAdded,
            onAddToFavorite,
            setCartItems,
            onAddToCart,
        }}>
            <div className="wrapper">

                <Drawer onRemoveCart={onRemoveCart} onclickClose={onclickClose} opened={cartOpened}/>
                <Header
                    onclickOpenCart={onclickClose}
                />
                <Routes>
                    <Route path="/" element={
                        <Home items={items}
                              onAddToCart={onAddToCart}
                              onAddToFavorite={onAddToFavorite}
                              cartItems={cartItems}
                              isReady={isReady}
                        />
                    }/>
                    <Route path={'/favorites'} element={<Favorites/>}/>
                    <Route path={'/orders'} element={<Orders/>}/>
                    <Route path={'/*'} element={<Page404/>}/>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}


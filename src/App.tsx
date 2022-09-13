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
    const [isReady, setIsReady] = useState(true)
    console.log(isReady)

    useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get('https://631dce89cc652771a48ba100.mockapi.io/cart')
            const favoritesResponse = await axios.get('https://631dce89cc652771a48ba100.mockapi.io/favorites')
            const itemsResponse = await axios.get('https://631dce89cc652771a48ba100.mockapi.io/items')

            setIsReady(false)

            setCartItems(cartResponse.data)
            setFavorites(favoritesResponse.data)
            setItems(itemsResponse.data)
            }
            fetchData()
        },[])
    console.log(isReady)

        const onAddToCart = async (obj: ItemsType) => {
            try {
                if (cartItems.find(cartObj => cartObj.id === obj.id)) {
                    axios.delete(`https://631dce89cc652771a48ba100.mockapi.io/cart/${obj.id}`)
                    setCartItems(prev => prev.filter((item) => item.id !== obj.id))
                } else {
                    const {data} = await axios.post('https://631dce89cc652771a48ba100.mockapi.io/cart', obj)
                    setCartItems((prev) => [...prev, data])
                }
            } catch {
                alert("Error")
            }
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
                              cartItems={cartItems}
                              isReady={isReady}
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


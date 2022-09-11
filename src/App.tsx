import React, {useState} from 'react';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {Card} from "./components/Card";

const data = [
    {
        imageUrl: './img/sneakers/1.jpg',
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        priceTitle: 'Цена',
        price: 12999
    },
    {
        imageUrl: './img/sneakers/2.jpg',
        title: 'Мужские Кроссовки Nike Air Max 270',
        priceTitle: 'Цена',
        price: 9000
    },
    {
        imageUrl: './img/sneakers/3.jpg',
        title: 'Мужские Кроссовки Nike Air Max 270',
        priceTitle: 'Цена',
        price: 10999
    },
    {
        imageUrl: './img/sneakers/4.jpg',
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        priceTitle: 'Цена',
        price: 11999
    },
]


export function App() {
    const [cartOpened, setCartOpened] = useState(true)

    return (
        <div className="wrapper">
            {cartOpened && <Drawer  onclickClose={()=>setCartOpened(false)}/>}
            <Header
                onclickOpenCart={()=>setCartOpened(true)}
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
                    {data.map((obj, index) => <Card
                        key={index}
                        title={obj.title}
                        imageUrl={obj.imageUrl}
                        price={obj.price}
                        priceTitle={obj.priceTitle}
                        onClickFavorite={() => console.log('Добавили закладки')}
                        onClickPlus={() => console.log('Нажали плюс')}
                    />)}
                </div>
            </div>
        </div>
    );
}


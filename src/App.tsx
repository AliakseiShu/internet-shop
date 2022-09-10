import React from 'react';
import {Header} from "./components/Header";
import {Drawer} from "./components/Drawer";
import {Card} from "./components/Card";
import unliked from './image/search.svg';

const data = [

    {
        imageUrl: './image/arrow.svg',
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        priceTitle: 'Цена',
        price: 12999
    },
    {
        imageUrl: '',
        title: 'Мужские Кроссовки Nike Air Max 270',
        priceTitle: 'Цена',
        price: 9000
    },
    {
        imageUrl: '',
        title: 'Мужские Кроссовки Nike Air Max 270',
        priceTitle: 'Цена',
        price: 10999
    },
    {
        imageUrl: '',
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        priceTitle: 'Цена',
        price: 11999
    },
]

export function App() {
    return (
        <div className="wrapper">
            <Drawer/>
            <Header/>
            <div className="content">
                <div className="contentWrapper">
                    <h1>Все кроссовки</h1>
                    <div className="searchBlock">
                        <img src={unliked} alt="Search"/>
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
                        onClick={() => console.log(obj)}
                    />)}
                </div>
            </div>
        </div>
    );
}

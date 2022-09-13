import React, {ChangeEvent, FC, useState} from 'react';
import {Card} from "../components/Card";
import {ItemsType} from "../App";

type HomeType = {
    items: ItemsType[]
    onAddToCart: (obj:ItemsType) => void
    onAddToFavorite: (obj:ItemsType) => void
}

export const Home: FC<HomeType> = ({items , onAddToCart, onAddToFavorite}) => {
    const [searchValue, setSearchValue] = useState('')

    const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    const oncClearSearchInput = () => {
        setSearchValue('')
    }

    return (
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
    );
};

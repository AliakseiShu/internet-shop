import React, {ChangeEvent, FC, useState} from 'react';
import {Card} from "../components/Card";
import {ItemType} from "../App";

type HomeType = {
    items: ItemType[]
    onAddToCart: (obj: ItemType) => void
    onAddToFavorite: (obj: ItemType) => void
    cartItems: ItemType[]
    isReady: boolean
}

export const Home: FC<HomeType> = ({items,
                                       onAddToCart,
                                       onAddToFavorite,
                                       isReady,
                                       }) => {
    const [searchValue, setSearchValue] = useState('')

    const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    const oncClearSearchInput = () => {
        setSearchValue('')
    }

    const renderItems = () => {
        const filteredItems = items.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (
            isReady
                ? Array(8).fill("")
                : filteredItems).map((item, index) =>
            (<Card
                key={index}
                id={item.id}
                parentId={item.parentId}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                onClickFavorite={(obj) => onAddToFavorite(obj)}
                onClickPlus={(obj) => onAddToCart(obj)}
                isReady={isReady}
            />))
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
                {renderItems()}
            </div>
        </div>
    );
};

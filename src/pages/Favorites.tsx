import React, {FC, useContext} from 'react';
import {ItemType} from "../App";
import {Card} from "../components/Card";
import {AppContext} from "../context";


export const Favorites = () => {
    const {favorites, onAddToFavorite} = useContext(AppContext)

    return (
        <div className="content">
            <div className="contentWrapper">
                <h1>Мои закладки</h1>
            </div>
            <div className="sneakers">
                {favorites?.map((item) =>
                    <Card
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        isFavorited
                        onClickFavorite={onAddToFavorite}
                    />)}
            </div>
        </div>
    );
};

import React, {FC} from 'react';
import {ItemsType} from "../App";
import {Card} from "../components/Card";

type FavoritesType = {
    favorites: ItemsType[]
    onAddToFavorite: (obj:ItemsType) => void
}

export const Favorites: FC<FavoritesType> = ({favorites,onAddToFavorite}) => {

    return (
        <div className="content">
            <div className="contentWrapper">
                <h1>Мои закладки</h1>
            </div>
            <div className="sneakers">
                    {favorites.map((item, index) =>
                        <Card
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            isFavorited={true}
                            onClickFavorite={onAddToFavorite}
                        />)}
            </div>
        </div>
    );
};

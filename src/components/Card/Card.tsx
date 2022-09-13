import React, {FC, useState} from 'react';
import styles from './Card.module.scss';
import {ItemsType} from "../../App";

type CardType = {
    id: string
    imageUrl: string
    title: string
    price: number
    onClickFavorite?: (obj: ItemsType) => void
    onClickPlus?: (obj: ItemsType) => void
    isFavorited?: boolean
    isAdd?: boolean | null
}

export const Card: FC<CardType> = ({
                                       id,
                                       imageUrl,
                                       title,
                                       price,
                                       onClickPlus,
                                       onClickFavorite,
                                       isFavorited = false,
                                       isAdd = false
                                   }) => {

    const [isAdded, setIsAdded] = useState(isAdd)
    const [isFavorite, setIsFavorite] = useState(isFavorited)

    const onClickAdd = (obj: ItemsType) => {
        if (onClickPlus) {
            onClickPlus(obj)
        }
        setIsAdded(!isAdded)
    }
    const onClickLike = (obj: ItemsType) => {
        if (onClickFavorite) {
            onClickFavorite(obj)
        }
        setIsFavorite(!isFavorite)
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img onClick={() => onClickLike({id, imageUrl, title, price})}
                     src={isFavorite ? "/img/liked.svg" : "./img/unliked.svg"} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl}/>
            <h5>{title}</h5>
            <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                    <span>Цена</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus}
                     onClick={() => onClickAdd({id, imageUrl, title, price})}
                     src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
                     alt="Plus"/>
            </div>
        </div>
    );
};

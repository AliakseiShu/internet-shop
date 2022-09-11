import React, {FC, useState} from 'react';
import styles from './Card.module.scss';
import {ItemsType} from "../../App";

type CardType = {

    imageUrl: string
    title: string
    price: number
    onClickFavorite: () => void
    onClickPlus: (obj: ItemsType) => void
}

export const Card: FC<CardType> = ({
                                       imageUrl,
                                       title,
                                       price,
                                       onClickPlus
                                   }) => {

    const [isAdded, setIsAdded] = useState(false)

    const onClickAdd = (obj: ItemsType) => {
        onClickPlus(obj)
        setIsAdded(!isAdded)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="./img/unliked.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl}/>
            <h5>{title}</h5>
            <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                    <span>Цена</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus}
                     onClick={() => onClickAdd({imageUrl,title,price})}
                     src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
                     alt="Plus"/>
            </div>
        </div>
    );
};

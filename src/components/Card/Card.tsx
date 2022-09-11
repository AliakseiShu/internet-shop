import React, {FC, useEffect, useState} from 'react';
import styles from './Card.module.scss';
import unliked from './imageCard/unliked.svg';
import plus from './imageCard/btn-plus.svg';
import addCard from './imageCard/btn-checked.svg';

type CardType = {
    imageUrl: string
    title: string
    priceTitle: string
    price: number
    onClickFavorite: () => void
    onClickPlus: () => void
}

export const Card: FC<CardType> = ({
                                       imageUrl,
                                       title,
                                       priceTitle,
                                       price,
                                       onClickPlus, onClickFavorite
                                   }) => {

    const [isAdded, setIsAdded] = useState(false)

    const onClickAdd = () => {
        setIsAdded(!isAdded)
    }

    useEffect(() => {
        console.log("Hello")
    },[isAdded])

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={unliked} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl}/>
            <h5>{title}</h5>
            <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                    <span>{priceTitle}</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus}
                     onClick={onClickAdd}
                     src={isAdded ? addCard : plus}
                     alt="Plus"/>
            </div>
        </div>
    );
};

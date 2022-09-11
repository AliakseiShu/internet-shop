import React, {FC, useState} from 'react';
import styles from './Card.module.scss';

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

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src="./img/unliked.svg" alt="Unliked"/>
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
                     src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
                     alt="Plus"/>
            </div>
        </div>
    );
};

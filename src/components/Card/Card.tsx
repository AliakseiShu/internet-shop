import React, {FC} from 'react';
import styles from './Card.module.scss';
import unliked from './imageCard/unliked.svg';
import plus from './imageCard/btn-plus.svg';

type CardType = {
    imageUrl: string
    title: string
    priceTitle: string
    price: number
    onClick: () => void
}

export const Card: FC<CardType> = ({imageUrl, title, priceTitle, price, onClick}) => {
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src={unliked} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl}/>
            <h5>{title}</h5>
            <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                    <span>{priceTitle}</span>
                    <b>{price} руб.</b>
                </div>
                <button onClick={onClick} className={styles.button}>
                    <img width={11} height={11} src={plus} alt="Plus"/>
                </button>
            </div>
        </div>
    );
};

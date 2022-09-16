import React, {FC, useContext, useState} from 'react';
import styles from './Card.module.scss';
import {ItemType} from "../../App";
import ContentLoader from "react-content-loader";
import {AppContext} from "../../context";


type CardType = {
    id: string
    imageUrl: string
    title: string
    price: number
    onClickFavorite?: (obj: ItemType) => void
    onClickPlus?: (obj: ItemType) => void
    isFavorited?: boolean
    isAdd?: boolean
    isReady?: boolean
}

export const Card: FC<CardType> = ({
                                       id,
                                       imageUrl,
                                       title,
                                       price,
                                       onClickPlus,
                                       onClickFavorite,
                                       isFavorited = false,
                                       //isAdd = false,
                                       isReady
                                   }) => {

    //const [isAdded, setIsAdded] = useState(isAdd)
    const [isFavorite, setIsFavorite] = useState(isFavorited)
    const {isItemAdded} = useContext(AppContext)
    console.log(title, isItemAdded && isItemAdded(id))

    const onClickAdd = (obj: ItemType) => {
        if (onClickPlus) {
            onClickPlus(obj)
        }
        //setIsAdded(!isAdded)
    }
    const onClickLike = (obj: ItemType) => {
        if (onClickFavorite) {
            onClickFavorite(obj)
        }
        setIsFavorite(!isFavorite)
    }
    return (

        <div className={styles.card}>
            {isReady
                ? <ContentLoader
                    speed={2}
                    width={165}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb" >
                    <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
                : <>
                    <div className={styles.favorite}>
                        <img onClick={() => onClickLike({id, imageUrl, title, price})}
                             src={isFavorite ? "/img/liked.svg" : "./img/unliked.svg"} alt="Unliked"/>
                    </div>
                    <img width="100%" height={135} src={imageUrl}/>
                    <h5>{title}</h5>
                    <div className={styles.cardBottom}>
                        <div className={styles.cardPrice}>
                            <span>Цена</span>
                            <b>{price} руб.</b>
                        </div>
                        <img className={styles.plus}
                             onClick={() => onClickAdd({id, imageUrl, title, price})}
                             src={isItemAdded && isItemAdded(id) ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
                             alt="Plus"/>
                    </div>
                </>            }

        </div>
    );
};

import React, {FC, useContext} from 'react';
import {AppContext} from "../context";

type InfoType = {
    title: string
    description: string
    image: string
    onclickClose: () => void
}

export const Info: FC<InfoType> = ({title, description, image,onclickClose}) => {
    const {setCartOpened} = useContext(AppContext)
    return (
        <div className="cartEmpty">
            <img className="emptyImage" src={image} alt="EmptyCart"/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={onclickClose} className="greenButton">
                <img className="imgArrow" src="img/arrow.svg" alt="Arrow"/>Вернуться назад
            </button>
        </div>
    );
};


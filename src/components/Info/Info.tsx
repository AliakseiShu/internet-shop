import React, {FC} from 'react';

type InfoType = {
    title: string
    description: string
    image: string
    onclickClose: () => void
}

export const Info: FC<InfoType> = ({title, description, image,onclickClose}) => {
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


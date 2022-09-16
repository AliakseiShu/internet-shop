import React from 'react';
import {ItemType} from "./App";

export type ContextTypes = {
    items: ItemType[],
    favorites: ItemType[],
    cartItems: ItemType[],
    isItemAdded: (id: string) => boolean
    onAddToFavorite: (obj: ItemType) => void
    setCartOpened: () => void
}

export const AppContext = React.createContext<Partial<ContextTypes>>({})


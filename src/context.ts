import React from 'react';
import {ItemType} from "./App";

export type ContextTypes = {
    items: ItemType[],
    favorites: ItemType[],
    cartItems: ItemType[],
    isItemAdded: (id: string) => boolean
}

export const AppContext = React.createContext<Partial<ContextTypes>>({})


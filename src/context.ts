import React from 'react';
import {ItemType} from "./App";

export type ContextTypes = {
    items: ItemType[],
    favorites: ItemType[],
    cartItems: ItemType[],
}

export const AppContext = React.createContext<Partial<ContextTypes>>({} )


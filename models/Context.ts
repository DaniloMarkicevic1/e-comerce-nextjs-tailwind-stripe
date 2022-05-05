import { Dispatch, SetStateAction } from 'react';
import { ProductType } from './Product';

export interface ContextType {
    showCart: boolean;
    setShowCart: Dispatch<SetStateAction<boolean>>;
    cartItems: ProductType[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: ProductType, quantity: number) => void;
    toggleCartItemQuanitity: (id: string, value: string) => void;
    onRemove: (product: ProductType) => void;
    setCartItems: Dispatch<SetStateAction<ProductType[]>>;
    setTotalPrice: Dispatch<SetStateAction<number>>;
    setTotalQuantities: Dispatch<SetStateAction<number>>;
}

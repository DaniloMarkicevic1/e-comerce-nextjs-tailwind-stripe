import {
    createContext,
    Dispatch,
    ReactNode,
    Reducer,
    ReducerAction,
    ReducerState,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { toast } from 'react-hot-toast';

const initialState: TypeState = {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
    qty: 1,
};
type ProductType = {
    quantity: number;
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    details: string;
    image: [
        {
            _key: string;
            _type: string;
            asset: {
                _ref: string;
                _type: string;
            };
        },
        {
            _key: string;
            _type: string;
            asset: {
                _ref: string;
                _type: string;
            };
        },
        {
            _key: string;
            _type: string;
            asset: {
                _ref: string;
                _type: string;
            };
        },
        {
            _key: string;
            _type: string;
            asset: {
                _ref: string;
                _type: string;
            };
        }
    ];
    name: string;
    price: number;
    slug: {
        _type: string;
        current: string;
    };
};

const initialContext: ContextType = {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
    qty: 1,
    dispatch: () => {},
    incQty: () => {},
    decQty: () => {},
    onAdd: (product: ProductType, quantity: number) => {},
    toggleCartItemQuantity: (id, value) => {},
};
type ContextType = {
    showCart: boolean;
    cartItems: [ProductType];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    dispatch: Dispatch<TypeAction>;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: ProductType, quantity: number) => void;
    toggleCartItemQuantity: (id: string, value: string) => void;
};
const Context = createContext(initialContext);

type Props = {
    children: ReactNode;
};

type TypeAction = {
    type: string;
    payload: any;
};
type TypeState = {
    showCart: boolean;
    cartItems: [ProductType];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
};
const reducer = (state: TypeState, action: TypeAction): TypeState => {
    switch (action.type) {
        case 'show_cart':
            return { ...state, showCart: !state.showCart };
        case 'cart_item_quantity':
            return { ...state, cartItems[action.payload]= cartItems };

        case 'add_item_to_cart':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case 'total_price':
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload * state.qty,
            };
        case 'total_quantities':
            return {
                ...state,
                totalQuantities: state.totalQuantities + action.payload,
            };
        case 'inc_qty':
            return { ...state, qty: state.qty + 1 };
        case 'dec_qty':
            if (state.qty - 1 < 1) return state;
            return { ...state, qty: state.qty - 1 };
        default:
            return state;
    }
};

export const StateContext: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let foundProduct;
    let index;
    const toggleCartItemQuantity = (id: string, value: string) => {
        foundProduct = state.cartItems.find((item) => item._id === id);
        index = state.cartItems.findIndex((product) => product._id === id);
        console.log(index);
        if (value === 'inc') {
            let newCartItems = [
                {
                    ...state,
                    ...foundProduct,
                    quantity: foundProduct.quantity + 1,
                },
            ];
            console.log(state);
            dispatch({
                type: 'total_price',
                payload: state.cartItems[index].price,
            });
            dispatch({
                type: 'total_quantities',
                payload: 1,
            });
            dispatch({ type: 'inc_qty', payload: newCartItems });
        }
        if (value === 'dec') {
            if (foundProduct?.quantity > 1) {
                let newCartItems = [
                    { ...foundProduct, quantity: foundProduct.quantity - 1 },
                ];
                const decPrice = state.cartItems[index].price;
                dispatch({
                    type: 'total_price',
                    payload: -decPrice,
                });
                dispatch({
                    type: 'total_quantities',
                    payload: -1,
                });
                // dispatch({ type: 'cart_item_quantity', payload: newCartItems });
            }
        }
    };

    const onAdd = (product: ProductType, quantity: number) => {
        const checkProductInCart = state.cartItems.find(
            (item: any) => item._id === product._id
        );

        dispatch({ type: 'total_price', payload: product.price });
        dispatch({ type: 'total_quantities', payload: quantity });
        if (checkProductInCart) {
            state.cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id)
                    return {
                        quantity: cartProduct.quantity + quantity,
                    };
            });
        } else {
            product.quantity = quantity;

            dispatch({ type: 'add_item_to_cart', payload: product });
        }
        toast.success(`${state.qty} ${product.name} added to the cart`);
    };

    const incQty = () => {
        dispatch({ type: 'inc_qty', payload: '' });
    };
    const decQty = () => {
        dispatch({ type: 'dec_qty', payload: '' });
    };

    return (
        <Context.Provider
            value={{
                showCart: state.showCart,
                totalPrice: state.totalPrice,
                cartItems: state.cartItems,
                totalQuantities: state.totalQuantities,
                qty: state.qty,
                dispatch,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => {
    const stateContext = useContext(Context);
    return stateContext;
};

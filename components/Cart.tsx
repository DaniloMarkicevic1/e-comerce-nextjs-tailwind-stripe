/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import {
    AiOutlineLeft,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

type Props = {};
const Cart: React.FC = (props: Props) => {
    const cartRef = useRef();
    const {
        totalPrice,
        totalQuantities,
        cartItems,
        dispatch,
        toggleCartItemQuantity,
    } = useStateContext();
    return (
        <div className="wrapper" ref={cartRef}>
            <div className="container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => dispatch({ type: 'show_cart', payload: '' })}
                >
                    <AiOutlineLeft />
                    <span>Your Cart: </span>
                    <span>{totalQuantities} items</span>
                </button>
                {/* If no products */}
                {cartItems.length < 1 && (
                    <div>
                        <AiOutlineShopping size={150} />
                        <p className="text-2xl">Your Shoping Bag Is Empty</p>
                        <Link href={'/'} passHref>
                            <button
                                type="button"
                                onClick={() =>
                                    dispatch({ type: 'show_cart', payload: '' })
                                }
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
                {/* Loop trough producs */}
                <div style={{ display: 'flex', margin: '25px 0 50px 0' }}>
                    {cartItems.length >= 1 &&
                        cartItems.map((item, i) => {
                            return (
                                <div key={item._id} style={{ display: 'flex' }}>
                                    {/* <img
                                        src={urlFor(item?.image[0])}
                                        alt="product"
                                        style={{
                                            backgroundColor: 'black',
                                            width: '100px',
                                            height: '100px',
                                        }}
                                    /> */}
                                    IMG GOES HERE:
                                    {/* Description */}
                                    <div>
                                        {/* TOP */}
                                        <div>
                                            <p>{item.name}</p>
                                            <p>{item.price}</p>
                                        </div>
                                        {/* Bottom */}
                                        <div>
                                            <p className="text-3xl">
                                                Quantity:
                                            </p>
                                            <p>
                                                <span
                                                    onClick={() =>
                                                        toggleCartItemQuantity(
                                                            item._id,
                                                            'dec'
                                                        )
                                                    }
                                                >
                                                    {<AiOutlineMinus />}
                                                </span>
                                                <span>{item.quantity}</span>
                                                <span
                                                    onClick={() =>
                                                        toggleCartItemQuantity(
                                                            item._id,
                                                            'inc'
                                                        )
                                                    }
                                                >
                                                    {<AiOutlinePlus />}
                                                </span>
                                            </p>
                                            <button
                                                type="button"
                                                className="remove"
                                                onClick=""
                                            >
                                                <TiDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {cartItems.length >= 1 && (
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <p>${totalPrice}</p>
                            </div>

                            <div>
                                <button type="button" onClick={''}>
                                    Pay with Stripe
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;

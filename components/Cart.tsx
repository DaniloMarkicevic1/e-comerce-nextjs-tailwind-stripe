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
        setShowCart,
        toggleCartItemQuanitity,
        onRemove,
    } = useStateContext()!;

    return (
        <div
            className="absolute right-0 bg-gray-600 flex flex-column text-white"
            // ref={cartRef}
        >
            <div className="">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}
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
                                onClick={() => setShowCart(false)}
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
                {/* Loop trough producs */}
                <div className="mx-15 my-20">
                    {cartItems.length >= 1 &&
                        cartItems.map((item, i) => {
                            return (
                                <div key={item._id} style={{ display: 'flex' }}>
                                    <img
                                        src={urlFor(item?.image[0])}
                                        alt="product"
                                        className="w-[100px] h-[100px] bg-gray-400"
                                    />
                                    {/* Description */}
                                    <div>
                                        {/* TOP */}
                                        <div>
                                            <p>{item.name}</p>
                                            <p>${item.price}</p>
                                        </div>
                                        {/* Bottom */}
                                        <div>
                                            <div className="flex mb-6">
                                                <p className="text-2xl text-gray-600">
                                                    Quantity:
                                                </p>
                                                <p className="flex items-center">
                                                    <button
                                                        type="button"
                                                        className="border-2 border-red-200 vertical p-2 max-h-8"
                                                        onClick={() =>
                                                            toggleCartItemQuanitity(
                                                                item._id,
                                                                'inc'
                                                            )
                                                        }
                                                    >
                                                        <AiOutlinePlus />
                                                    </button>
                                                    <span className="leading-3 border-2 border-red-200 vertical p-2 max-h-8">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="border-2 border-red-200 vertical p-2 max-h-8"
                                                        onClick={() =>
                                                            toggleCartItemQuanitity(
                                                                item._id,
                                                                'dec'
                                                            )
                                                        }
                                                    >
                                                        <AiOutlineMinus />
                                                    </button>
                                                </p>
                                                <button
                                                    type="button"
                                                    className="text-red-700 text-2xl"
                                                    onClick={() =>
                                                        onRemove(item)
                                                    }
                                                >
                                                    <TiDeleteOutline />
                                                </button>
                                            </div>
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
                                {/* <button type="button" onClick={''}>
                                    Pay with Stripe
                                </button> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;

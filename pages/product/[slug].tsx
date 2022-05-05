/* eslint-disable @next/next/no-img-element */
import { GetStaticPaths, GetStaticProps } from 'next';
import { client, urlFor } from '../../lib/client';
import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiFillStar,
    AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import { ProductType } from '../../models/Product';
import { ProductsType } from '../../models/Products';

type Props = {
    product: ProductType;
    products: [ProductsType];
};

const ProductDetails: React.FC<Props> = ({ product, products }) => {
    const { image, name, price, details } = product;
    const [index, setIndex] = useState(0);
    const { incQty, decQty, qty, cartItems, onAdd } = useStateContext()!;

    return (
        <div className="p-10">
            <div className="flex items-center">
                {/* LEFT SIDE */}
                <div>
                    <div className="max-w-10/12 max-h-[450px] mb-5 mr-3">
                        <img
                            src={urlFor(image && image[index])}
                            alt="product"
                            className="bg-blue-300 rounded-xl mb-5 max-w-[10/12] max-h-[450px]"
                        />
                    </div>
                    <div className="flex hover:cursor-pointer">
                        {image.map((item, i) => (
                            <img
                                src={urlFor(item)}
                                width={100}
                                height={100}
                                key={i}
                                alt="headphones"
                                onMouseEnter={() => setIndex(i)}
                                className={`${
                                    index === i ? 'bg-red-700' : 'bg-gray-300'
                                } mr-2 rounded-xl `}
                            />
                        ))}
                    </div>
                </div>

                {/* LEFT SIDE */}
                {/* RIGHT SIDE */}
                <div>
                    <p className="text-3xl font-bold">{name}</p>
                    <div className="flex items-center">
                        <div className="flex text-red-600">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar className="text-black" />
                        </div>
                        <p>(20)</p>
                    </div>
                    <p className="text-xl font-bold">Details:</p>
                    <p className="text-xl">{details}</p>
                    <p className="mt-10 text-red-700 font-bold text-2xl">
                        ${price}
                    </p>
                    <div className="flex mb-6">
                        <p className="text-2xl text-gray-600">Quantity:</p>
                        <p className="flex items-center">
                            <button
                                type="button"
                                className="border-2 border-red-200 vertical p-2 max-h-8"
                                onClick={decQty}
                            >
                                <AiOutlineMinus />
                            </button>
                            <span className="leading-3 border-2 border-red-200 vertical p-2 max-h-8">
                                {qty}
                            </span>
                            <button
                                type="button"
                                className="border-2 border-red-200 vertical p-2 max-h-8"
                                onClick={incQty}
                            >
                                <AiOutlinePlus />
                            </button>
                        </p>
                    </div>
                    {/* Buttons Add to cart and Buy Now */}
                    <button
                        type="button"
                        onClick={() => onAdd(product, qty)}
                        className="bg-red-500 rounded-md p-2 mr-3 text-white"
                    >
                        Add To Cart
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 rounded-md p-2 text-white"
                    >
                        Buy Now
                    </button>
                </div>
                {/* ****************************** */}
                {/* RIGHT SIDE */}
            </div>
            {/* Supose to Marquee, Similar products */}
            <div>
                <p className="text-xl">You may also like: </p>
                {/* <div>MArquee</div> */}
                <div className="flex w-70 h-70">
                    {products.map((product: ProductsType) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product: { slug: { current: string } }) => ({
        params: {
            slug: product.slug.current,
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "product" && slug.current == '${params?.slug}'][0]`;

    const productsQuery = `*[_type == "product"]`;

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: {
            products,
            product,
        },
    };
};

export default ProductDetails;

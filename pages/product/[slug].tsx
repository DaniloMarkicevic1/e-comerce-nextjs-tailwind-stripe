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

type Props = {
    product: {
        image: [
            {
                _ref: string;
                _type: string;
            }
        ];
        name: string;
        price: string;
        details: string;
    };
    products: [ProductType];
};
type ProductType = {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    details: string;
    image: [
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

const ProductDetails: React.FC<Props> = ({
    product: { image, name, price, details },
    products,
}) => {
    const [index, setIndex] = useState(0);

    return (
        <div>
            <div>
                <div>
                    <div>
                        <img
                            src={urlFor(image && image[index])}
                            alt="product"
                            width="250"
                            height="250"
                            className="bg-blue-300"
                        />
                    </div>
                    <p>Carousele</p>
                    <div>
                        {image.map((item, i) => (
                            <img
                                src={urlFor(item)}
                                width={100}
                                height={100}
                                key={i}
                                alt="headphones"
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                    <div>
                        <p className="text-3xl">{name}</p>
                        <div>
                            <div>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiOutlineStar />
                            </div>
                            <p>(20)</p>
                        </div>
                    </div>
                    <p className="text-3xl">Details:</p>
                    <p className="text-3xl">{details}</p>
                    <p>{price}</p>
                    <div>
                        <p className="text-3xl">Quantity:</p>
                        <p>
                            <span>{<AiOutlineMinus />}</span>
                            <span>0</span>
                            <span>{<AiOutlinePlus />}</span>
                        </p>
                    </div>
                    <div>
                        <button type="button">Add To Cart</button>
                        <button type="button">Buy Now</button>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-xl">May like product</p>
                <div>MArquee</div>
                <div>
                    {products.map((product: ProductType) => (
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
    console.log(params?.asd);
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

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { ProductType } from '../models/Product';

type Props = { product: ProductType };

const Product: React.FC<Props> = ({
    product: { image, name, slug, price },
}) => {
    return (
        <div className="bg-gray-300 m-2 rounded-md p-3 hover:cursor-pointer">
            <Link href={`/product/${slug.current}`} passHref>
                <div className="text-center">
                    <img
                        src={urlFor(image && image[0])}
                        width={250}
                        height={250}
                        alt="headphones"
                    />
                    <p>{name}</p>
                    <p className="font-bold">${price}</p>
                </div>
            </Link>
        </div>
    );
};

export default Product;

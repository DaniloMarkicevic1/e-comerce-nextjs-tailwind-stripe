/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { Product } from '../pages';
type Props = { product: Product };

const Product: React.FC<Props> = ({
    product: { image, name, slug, price },
}) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`} passHref>
                <div className="border-solid border-2 border-black-700">
                    <img
                        src={urlFor(image && image[0])}
                        width={250}
                        height={250}
                        alt="headphones"
                    />
                    <p>{name}</p>
                    <p>${price}</p>
                </div>
            </Link>
        </div>
    );
};

export default Product;

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { urlFor } from '../lib/client';

type Props = {
    footerBanner: {
        _createdAt: string;
        _id: string;
        _rev: string;
        _type: string;
        _updatedAt: string;
        buttonText: string;
        desc: string;
        discount: string;
        image: {
            _type: string;
            asset: {
                _ref: string;
                _type: string;
            };
        };
        largeText1: string;
        largeText2: string;
        midText: string;
        product: string;
        saleTime: string;
        smallText: string;
    };
};

const FooterBanner: React.FC<Props> = ({
    footerBanner: {
        discount,
        largeText1,
        largeText2,
        saleTime,
        midText,
        buttonText,
        smallText,
        image,
        desc,
        product,
    },
}) => {
    return (
        <div>
            <div className="grid grid-cols-3 bg-red-600 rounded-xl p-4 text-white md:w-10/12 w-full mx-auto max-h-80 mt-10">
                <div className="flex flex-col pb-10 pl-10 mt-16">
                    <p>{discount}</p>
                    <p className="text-7xl font-black ml-2">{largeText1}</p>
                    <p className="text-7xl font-black ml-2">{largeText2}</p>
                    <p>{saleTime}</p>
                </div>
                <img
                    src={urlFor(image)}
                    alt="product"
                    className="-mt-20 w-full"
                />
                <div className="flex flex-col items-start mt-12">
                    <p>{smallText}</p>
                    <p className="text-5xl font-black py-3">{midText}</p>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`} passHref>
                        <button
                            type="button"
                            className="bg-white text-red-600 rounded-xl py-2 px-4 mt-6"
                        >
                            {buttonText}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FooterBanner;

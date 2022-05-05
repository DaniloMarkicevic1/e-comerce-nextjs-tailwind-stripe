/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../lib/client';
type Props = {
    heroBanner: {
        buttonText: 'Shop Now';
        desc: 'Best headphones on the market';
        discount: '20% OFF';
        image: {
            _type: 'image';
            asset: {
                _ref: 'image-a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555-webp';
                _type: 'reference';
            };
        };
        largeText1: 'FINE';
        largeText2: 'SMILE';
        midText: 'Summer Sale';
        product: 'headphones';
        saleTime: '15 Nov to 7 Dec';
        smallText: 'Beats Solo Air';
        _createdAt: '2022-04-29T11:45:57Z';
        _id: '5e7291c7-686e-4251-9d6c-2658decce57e';
        _rev: 'dEFIOHoYyCUIVzdu8W5uA6';
        _type: 'banner';
        _updatedAt: '2022-04-29T11:45:57Z';
    } | null;
};

const HeroBanner: React.FC<Props> = ({ heroBanner }) => {
    return (
        <div className="bg-gray-300 rounded-md w-4/6 grid mx-auto my-0 py-2 px-20 grid-cols-2 justify-center items-center">
            <div className="text-left">
                <p className="text-lg">{heroBanner?.smallText} </p>
                <p className="text-6xl font-bold">{heroBanner?.midText}</p>
                <p className="text-6xl font-bold text-white">
                    {heroBanner?.largeText1}
                </p>
                <img
                    src={urlFor(heroBanner?.image)}
                    width={200}
                    height={200}
                    alt="headphones"
                />
            </div>
            <div className="text-center">
                <Link href={'/product/:ID'} passHref>
                    <button
                        type="button"
                        className="bg-red-500 rounded-md py-2 px-5 text-white"
                    >
                        {heroBanner?.buttonText}
                    </button>
                </Link>
                <div>
                    <p className="text-3xl">Description:</p>
                    <p>{heroBanner?.desc}</p>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;

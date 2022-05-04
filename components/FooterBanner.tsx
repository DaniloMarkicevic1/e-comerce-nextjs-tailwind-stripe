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
            <div>
                <div className="left">
                    <p>{discount}</p>
                    <p>{largeText1}</p>
                    <p>{largeText2}</p>
                    <p>{saleTime}</p>
                </div>
                <div className="right">
                    <p>{smallText}</p>
                    <p>{midText}</p>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`} passHref>
                        <button type="button">{buttonText}</button>
                    </Link>
                    <img src={urlFor(image)} alt="gfd" />
                </div>
            </div>
        </div>
    );
};

export default FooterBanner;

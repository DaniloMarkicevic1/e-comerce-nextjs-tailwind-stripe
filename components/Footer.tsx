import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

type Props = {};

const Footer = (props: Props) => {
    return (
        <div className="flex flex-col justify-center text-center">
            <p>&copy; 2022 JSM Headphones All rights reserved</p>
            <p className="flex mx-auto">
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
        </div>
    );
};

export default Footer;

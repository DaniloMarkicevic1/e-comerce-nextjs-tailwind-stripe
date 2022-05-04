import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

type Props = {};

const Footer = (props: Props) => {
    return (
        <div>
            <p>2022 JSM Headphones All rights reserved</p>
            <p>
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
        </div>
    );
};

export default Footer;

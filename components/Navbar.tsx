import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
type Props = {};

const Navbar = (props: Props) => {
    return (
        <div>
            <p>
                <Link href={'/'}>JSM Headphones</Link>
            </p>
            <button type="button">
                <AiOutlineShopping />
                <span>{1}</span>
            </button>
        </div>
    );
};

export default Navbar;

import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from './';

const Navbar: React.FC = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext()!;
    return (
        <div className="flex justify-between relative mx-2 mt-2">
            <p className="flex items-center">
                <Link href={'/'}>JSM Headphones</Link>
            </p>
            <button
                type="button"
                onClick={() => setShowCart(true)}
                className="relative mt-2"
            >
                <AiOutlineShopping className="text-3xl  mr-2 mt-1" />
                <span className="absolute top-0 right-0 bg-red-600 rounded-full w-5 h-5 text-white leading-5">
                    {totalQuantities}
                </span>
            </button>
            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;

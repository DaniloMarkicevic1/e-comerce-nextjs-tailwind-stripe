import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { Cart } from './';
type Props = {};

const Navbar: React.FC = (props: Props) => {
    const { showCart, totalQuantities, dispatch } = useStateContext();
    return (
        <div>
            <p>
                <Link href={'/'}>JSM Headphones</Link>
            </p>
            <button
                type="button"
                onClick={() => dispatch({ type: 'show_cart', payload: '' })}
            >
                <AiOutlineShopping />
                <span>{1}</span>
            </button>
            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;

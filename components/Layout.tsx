import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <Head>
                <title>MY Mastery Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;

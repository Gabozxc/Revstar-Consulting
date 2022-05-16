import Head from 'next/head';

import Nav from './Nav'

const Header = () => {
    return (
        <header>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Nav />
        </header>
    );
}

export default Header;
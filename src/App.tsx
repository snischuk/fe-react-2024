import type { FC, MouseEvent } from 'react';
import { useState } from 'react';

import { About } from '@components/About/About';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ProductsList } from '@components/ProductsList/ProductsList';

import { PRODUCTS } from '@/data/mock-products';

import styles from './App.module.css';

const App: FC = () => {
    const [pageActive, setPageActive] = useState<string>('about');

    const onPageLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const clickedPageLink = event.currentTarget.dataset.page;

        if (clickedPageLink) {
            setPageActive(clickedPageLink);
        }
    };

    let content;

    switch (pageActive) {
        case 'about': {
            content = <About />;
            break;
        }
        case 'products': {
            content = <ProductsList products={PRODUCTS} />;
            break;
        }
        default: {
            content = <About />;
        }
    }

    return (
        <>
            <Header pageActive={pageActive} onPageLinkClick={onPageLinkClick} />
            <main className={styles.main}>{content}</main>
            <Footer />
        </>
    );
};

export default App;

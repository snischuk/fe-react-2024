import type { FC, MouseEvent } from 'react';
import { useState } from 'react';

import { About } from '@components/About/About';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { ProductsList } from '@components/ProductsList/ProductsList';
import { PageName } from '@interfaces/PageName';

import { MOCK_PRODUCTS } from '@/data/mock-products';

import styles from './App.module.css';

const App: FC = () => {
    const [pageActive, setPageActive] = useState<PageName>(PageName.ABOUT);

    const onPageLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const clickedPageLink = event.currentTarget.dataset.page;

        if (clickedPageLink) {
            setPageActive(clickedPageLink as PageName);
        }
    };

    let content;

    switch (pageActive) {
        case PageName.ABOUT: {
            content = <About />;
            break;
        }
        case PageName.PRODUCTS: {
            content = <ProductsList products={MOCK_PRODUCTS} />;
            break;
        }
        default: {
            content = <div>Page not found... :(</div>;
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

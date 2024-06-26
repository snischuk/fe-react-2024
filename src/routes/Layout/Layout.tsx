import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';

import styles from './Layout.module.css';

const Layout: FC = () => (
    <>
        <Header />
        <main className={styles.main}>
            <Outlet />
        </main>
        <Footer />
    </>
);

export { Layout };

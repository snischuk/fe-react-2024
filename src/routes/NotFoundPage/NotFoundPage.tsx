import type { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

const NotFoundPage: FC = () => (
    <>
        <p className={styles.notFoundPageInfo}>Oops! Page not found... :(</p>
        <Link className={styles.notFoundPageLink} to="/">
            Go to About page.
        </Link>
    </>
);

export { NotFoundPage };

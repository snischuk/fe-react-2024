import type { FC } from 'react';
import { PuffLoader } from 'react-spinners';

import styles from './Loader.module.css';

const Loader: FC = () => (
    <div className={styles.loader}>
        <PuffLoader color="#EF4934" />
    </div>
);

export { Loader };

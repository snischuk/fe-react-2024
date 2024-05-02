import type { FC, ReactNode } from 'react';

import styles from './socialIcon.module.css';

export interface SocialIconProps {
    url: string;
    children: ReactNode;
}

const SocialIcon: FC<SocialIconProps> = ({ url, children }) => (
    <a className={styles.socialLink} href={url} target="_blank" rel="noreferrer">
        {children}
    </a>
);

export { SocialIcon };

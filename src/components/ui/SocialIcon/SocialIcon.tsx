import type { ReactNode } from 'react';

import styles from './socialIcon.module.css';

export interface SocialIconProps {
    url: string;
    children: ReactNode;
}

function SocialIcon({ url, children }: SocialIconProps) {
    return (
        <a className={styles.socialLink} href={url} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
}

export { SocialIcon };

import type { FC } from 'react';

import { SocialIcon } from '@components/ui/SocialIcon/SocialIcon';
import IconFacebook from '@icons/facebook.svg?react';
import IconInstagram from '@icons/instagram.svg?react';
import IconLinkedin from '@icons/linkedin.svg?react';

import styles from './Footer.module.css';

const Footer: FC = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <ul className={styles.footerSocialList}>
                <li className={styles.footerSocialItem}>
                    <SocialIcon url="https://www.facebook.com/">
                        <IconFacebook className={styles.footerSocialIcon} />
                    </SocialIcon>
                </li>
                <li className={styles.footerSocialItem}>
                    <SocialIcon url="https://www.linkedin.com/">
                        <IconLinkedin className={styles.footerSocialIcon} />
                    </SocialIcon>
                </li>
                <li className={styles.footerSocialItem}>
                    <SocialIcon url="https://www.instagram.com/">
                        <IconInstagram className={styles.footerSocialIcon} />
                    </SocialIcon>
                </li>
            </ul>
            <p className={styles.footerText}>
                Made with 💗 on course{' '}
                <a
                    className={styles.footerLink}
                    href="https://www.mastersacademy.education/frontend-for-beginners-it"
                    target="_blank"
                    rel="noreferrer"
                >
                    &apos;Intro to React&apos; from Masters Academy in 2024
                </a>
                , by Max Snischuk
            </p>
        </div>
    </footer>
);

export { Footer };

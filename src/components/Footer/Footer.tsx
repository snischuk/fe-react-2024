import IconFacebook from '../../assets/images/icons/facebook.svg';
import IconInstagram from '../../assets/images/icons/instagram.svg';
import IconLinkedin from '../../assets/images/icons/linkedin.svg';
import type { SocialIconProps } from '../ui/SocialIcon/SocialIcon';
import { SocialIcon } from '../ui/SocialIcon/SocialIcon';

import styles from './footer.module.css';

const SOCIAL_ICONS: SocialIconProps[] = [
    { url: 'https://www.facebook.com/', iconPath: IconFacebook },
    { url: 'https://www.linkedin.com/', iconPath: IconLinkedin },
    { url: 'https://www.instagram.com/', iconPath: IconInstagram },
];

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <ul className={styles.footer__socList}>
                    {SOCIAL_ICONS.map((socialIcon, index) => (
                        <li className={styles.footer__socItem} key={index}>
                            <SocialIcon url={socialIcon.url} iconPath={socialIcon.iconPath} />
                        </li>
                    ))}
                </ul>
                <p className={styles.footer__text}>
                    Made with 💗 on course{' '}
                    <a
                        className={styles.footer__link}
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
}

export { Footer };

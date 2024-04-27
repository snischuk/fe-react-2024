import IconFacebook from '../../assets/images/icons/facebook.svg';
import IconInstagram from '../../assets/images/icons/instagram.svg';
import IconLinkedin from '../../assets/images/icons/linkedin.svg';
import { SocialIcon } from '../ui/SocialIcon/SocialIcon';

import styles from './footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <ul className={styles.footer__socList}>
                    <li className={styles.footer__socItem}>
                        <SocialIcon url="https://www.facebook.com/" iconPath={IconFacebook} />
                    </li>
                    <li className={styles.footer__socItem}>
                        <SocialIcon url="https://www.linkedin.com/" iconPath={IconLinkedin} />
                    </li>
                    <li className={styles.footer__socItem}>
                        <SocialIcon url="https://www.linkedin.com/" iconPath={IconInstagram} />
                    </li>
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

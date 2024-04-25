import aboutImage from '@/assets/images/about/about-main.jpeg';

import styles from './about.module.css';

function AboutComponent() {
    return (
        <div className={styles.about}>
            <img className={styles.about__image} src={aboutImage} width="552" height="777" alt="Awesome product" />
            <div className={styles.about__content}>
                <h1 className={styles.about__title}>About me</h1>
                <p className={styles.about__description}>
                    Hi! My name is Max and I&apos;m a Junior Frontend Developer. I am already familiar with main Web Technologies like
                    React, HTML, CSS, JavaScript and Git version control system.
                </p>
                <p className={styles.about__description}>
                    This page was developed during the course{' '}
                    <a
                        className={styles.about__link}
                        href="https://www.mastersacademy.education/frontend-for-beginners-it"
                        target="_blank"
                        rel="noreferrer"
                    >
                        &apos;Intro to React&apos;
                    </a>{' '}
                    from Masters Academy in 2024.
                </p>
                <p className={styles.about__description}>
                    This is a social project from MOCG company where I got an opportunity to work with Frontend mentors and to create my own
                    small project for the portfolio.
                </p>
                <p className={styles.about__description}>
                    You can contact me via{' '}
                    <a className={styles.about__link} href="https://t.me/max_snischuk" target="_blank" rel="noreferrer">
                        Telegram
                    </a>{' '}
                    and check out my{' '}
                    <a className={styles.about__link} href="https://github.com/snischuk" target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export { AboutComponent };

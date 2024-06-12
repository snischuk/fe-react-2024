import type { FC } from 'react';

import { ThemeMode } from '@interfaces/ThemeMode';

import aboutImageDark from '@/assets/images/about/about-main-dark.jpeg';
import aboutImageLight from '@/assets/images/about/about-main-light.jpeg';

import styles from './AboutPage.module.css';

interface AboutPageProps {
    currentTheme: ThemeMode;
}

const AboutPage: FC<AboutPageProps> = ({ currentTheme }) => {
    const getImgDependOnTheme = (theme: string) => (theme === ThemeMode.LIGHT ? aboutImageLight : aboutImageDark);

    return (
        <article className={styles.about}>
            <div className={styles.aboutContainer}>
                <img className={styles.aboutImage} src={getImgDependOnTheme(currentTheme)} width="552" height="777" alt="Awesome product" />
                <div className={styles.aboutContent}>
                    <h1 className={styles.aboutTitle}>About me</h1>
                    <p className={styles.aboutDescription}>
                        Hi! My name is Max and I&apos;m a Junior Frontend Developer. I am already familiar with main Web Technologies like
                        React, HTML, CSS, JavaScript and Git version control system.
                    </p>
                    <p className={styles.aboutDescription}>
                        This page was developed during the course{' '}
                        <a
                            className={styles.aboutLink}
                            href="https://www.mastersacademy.education/frontend-for-beginners-it"
                            target="_blank"
                            rel="noreferrer"
                        >
                            &apos;Intro to React&apos;
                        </a>{' '}
                        from Masters Academy in 2024.
                    </p>
                    <p className={styles.aboutDescription}>
                        This is a social project from MOCG company where I got an opportunity to work with Frontend mentors and to create my
                        own small project for the portfolio.
                    </p>
                    <p className={styles.aboutDescription}>
                        You can contact me via{' '}
                        <a className={styles.aboutLink} href="https://t.me/max_snischuk" target="_blank" rel="noreferrer">
                            Telegram
                        </a>{' '}
                        and check out my{' '}
                        <a className={styles.aboutLink} href="https://github.com/snischuk" target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                        .
                    </p>
                </div>
            </div>
        </article>
    );
};

export { AboutPage };

import styles from './socialIcon.module.css';

interface SocialIconProps {
    url: string;
    iconPath: string;
}

function SocialIcon({ url, iconPath }: SocialIconProps) {
    return (
        <a className={styles.socLink} href={url} target="_blank" rel="noreferrer">
            <img src={iconPath} alt="Very beautiful icon" />
        </a>
    );
}

export { SocialIcon };

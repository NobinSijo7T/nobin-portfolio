import styles from './Button.module.scss';
import Link from "next/link";

export default function FancyButton({element, type, link, target, theme, isEnabled, children, onClick, dataText}) {
    const btnClass = styles[theme];
    const hoverText = dataText || children;

    if(element === 'button'){
        return (
            <button className={`${styles.button} ${btnClass}`} type={type} onClick={onClick}>
                <span className={styles.border}></span>
                <span className={styles.ripple}>
                    <span></span>
                </span>
                <span className={styles.title}>
                    <span data-text={hoverText}>{children}</span>
                </span>
            </button>
        )
    } else {
        return (
            <Link href={link} target={target} className={`${styles.button} ${btnClass}`} disabled={!isEnabled}>
                <span className={styles.border}></span>
                <span className={styles.ripple}>
                    <span></span>
                </span>
                <span className={styles.title}>
                    <span data-text={hoverText}>{children}</span>
                </span>
            </Link>
        )
    }
}
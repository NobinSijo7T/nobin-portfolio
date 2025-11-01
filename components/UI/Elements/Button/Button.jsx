import styles from './Button.module.scss';
import Link from "next/link";

export default function FancyButton({element, type, link, target, theme, isEnabled, children, onClick, dataText, title, className, ...otherProps}) {
    const btnClass = styles[theme];
    const hoverText = dataText || children;
    const combinedClassName = className ? `${styles.button} ${btnClass} ${className}` : `${styles.button} ${btnClass}`;

    if(element === 'button'){
        return (
            <button className={combinedClassName} type={type} onClick={onClick} title={title} {...otherProps}>
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
            <Link href={link} target={target} className={combinedClassName} disabled={!isEnabled} title={title} {...otherProps}>
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
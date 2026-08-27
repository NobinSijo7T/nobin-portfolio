import React from 'react';
import styles from './Logo.module.scss';
import Link from 'next/link';
import commonConfig from '@/database/config/metadata.json';

export default function Logo({ classVariable }) {
    return (
        <Link
            href="/"
            className={classVariable}
            aria-label={commonConfig.metadata.title}
        >
            <div className={styles.logoContainer}>
                <div className={styles.logoImageWrapper}>
                    <img src="/Logo.svg" alt="" className={styles.logoImage} />
                </div>
                <div className={styles.logoText} suppressHydrationWarning>
                    <span>Nobin Sijo</span>
                </div>
            </div>
        </Link>
    );
}
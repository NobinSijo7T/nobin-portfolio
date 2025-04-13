import React, { useState, useEffect } from 'react';
import styles from './Logo.module.scss';
import Link from 'next/link';
import commonConfig from '@/database/config/metadata.json';

export default function Logo({ classVariable }) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentFontIndex, setCurrentFontIndex] = useState(0);

    const fonts = [
        'Paladins',
        'Poppins',
        'Montserrat',
        'Lexend',
        'Google Sans',
        'Lato'
    ];

    useEffect(() => {
        const fontInterval = setInterval(() => {
            setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
        }, 3000);
        return () => clearInterval(fontInterval);
    }, []);

    return (
        <Link 
            href="/" 
            className={classVariable} 
            aria-label={commonConfig.metadata.title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.logoContainer}>
                <div 
                    className={`${styles.logoText} ${isHovered ? styles.textHovered : ''}`}
                    style={{ fontFamily: `${fonts[currentFontIndex]}, sans-serif` }}
                >
                    <span className={styles.fontTransition}>Nobin Sijo</span>
                </div>
            </div>
        </Link>
    );
}
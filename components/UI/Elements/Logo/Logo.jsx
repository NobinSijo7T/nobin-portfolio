import React, { useState, useEffect } from 'react';
import styles from './Logo.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import commonConfig from '@/database/config/metadata.json';

export default function Logo({ classVariable }) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentFontIndex, setCurrentFontIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const fonts = [
        'Orbitron',
        'Audiowide',
        'Space Grotesk',
        'Syncopate',
        'Rajdhani',
        'Exo 2'
    ];

    useEffect(() => {
        const fontInterval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
                setIsTransitioning(false);
            }, 300);
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
                <div className={`${styles.logoImageWrapper} ${isHovered ? styles.logoHovered : ''}`}>
                    <Image
                        src="/Logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className={styles.logoImage}
                        priority
                    />
                </div>
                <div 
                    className={`${styles.logoText} ${isHovered ? styles.textHovered : ''} ${isTransitioning ? styles.fontTransition : ''}`}
                    style={{ fontFamily: `${fonts[currentFontIndex]}, sans-serif` }}
                >
                    <span>Nobin Sijo</span>
                </div>
            </div>
        </Link>
    );
}
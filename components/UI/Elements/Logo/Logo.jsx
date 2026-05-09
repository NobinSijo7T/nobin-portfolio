import React, { useState, useEffect } from 'react';
import styles from './Logo.module.scss';
import Link from 'next/link';
import commonConfig from '@/database/config/metadata.json';
import MetallicPaint from '@/components/UI/Elements/MetallicPaint/MetallicPaint';

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
        'Exo 2',
        'Codystar',
        'Permanent Marker',
        'Bangers',
        'Silkscreen',
        'Doto',
        'Rammetto One',
        'Bruno Ace SC',
        'Sixtyfour',
        'Zen Tokyo Zoo',
        'Kablammo',
        'Playwrite México',
        'Stint Ultra Expanded',
        'Yuji Boku',
        'Darumadrop One',
        'Jacquard 24',
        'Geostar Fill',
        'Workbench'
    ];

    useEffect(() => {
        const fontInterval = setInterval(() => {
            setIsTransitioning(true);
            
            // Wait for text to fade out before changing font
            setTimeout(() => {
                setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
            }, 400);
            
            // Remove transition class to fade back in
            setTimeout(() => {
                setIsTransitioning(false);
            }, 800);
        }, 3500);

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
                    <MetallicPaint
                        imageSrc="/Logo.svg"
                        seed={42}
                        scale={4}
                        patternSharpness={1}
                        noiseScale={0.5}
                        speed={0.3}
                        liquid={0.75}
                        mouseAnimation={false}
                        brightness={2}
                        contrast={0.5}
                        refraction={0.01}
                        blur={0.015}
                        chromaticSpread={2}
                        fresnel={1}
                        angle={0}
                        waveAmplitude={1}
                        distortion={1}
                        contour={0.2}
                        lightColor="#ffffff"
                        darkColor="#000000"
                        tintColor="#feb3ff"
                    />
                </div>
                <div
                    className={`${styles.logoText} ${isHovered ? styles.textHovered : ''} ${isTransitioning ? styles.fontTransition : ''}`}
                    style={{ fontFamily: `${fonts[currentFontIndex]}, sans-serif` }}
                    suppressHydrationWarning
                >
                    <span>Nobin Sijo</span>
                </div>
            </div>
        </Link>
    );
}
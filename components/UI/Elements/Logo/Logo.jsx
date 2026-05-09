import React, { useState } from 'react';
import styles from './Logo.module.scss';
import Link from 'next/link';
import commonConfig from '@/database/config/metadata.json';
import MetallicPaint from '@/components/UI/Elements/MetallicPaint/MetallicPaint';

export default function Logo({ classVariable }) {
    const [isHovered, setIsHovered] = useState(false);

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
                    className={`${styles.logoText} ${isHovered ? styles.textHovered : ''}`}
                    suppressHydrationWarning
                >
                    <span>Nobin Sijo</span>
                </div>
            </div>
        </Link>
    );
}
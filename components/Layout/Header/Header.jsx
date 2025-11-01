'use client';

import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss'
import Logo from '@/components/UI/Elements/Logo/Logo';
import Navigation from '@/components/Layout/Navigation/Navigation';
import AudioPlayerNew from '@/components/UI/Elements/AudioPlayer/AudioPlayerNew';
import { useAudioPlayer } from '@/components/UI/Elements/AudioPlayer/AudioPlayerNew';
import commonConfig from '@/database/config/metadata.json';

export default function Header() {
    const [currentTime, setCurrentTime] = useState('');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
    const player = useAudioPlayer();

    useEffect(() => {
        // Get current time in Kollam, Kerala, India (IST) on the client side
        const timeZone = 'Asia/Kolkata'; // Time zone for India Standard Time
        const clientTime = new Date().toLocaleString('en-IN', { // 'en-IN' for Indian English locale
            timeZone: timeZone,
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZoneName: 'short'
        });
        setCurrentTime(clientTime);
    }, []); // Empty dependency array ensures this runs only once after the initial render

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const toggleAudioPlayer = () => {
        setIsAudioPlayerOpen(!isAudioPlayerOpen);
    };

    return (
        <>
            <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
                <div className={styles.inner}>
                    <Logo classVariable={styles.logo}></Logo>
                    <div className={styles.location}>{`${commonConfig.personal.city}, ${commonConfig.personal.state} ${currentTime}`}</div>
                    <div className={styles.openToWork}><span></span> Open To Work</div>
                    <Navigation isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}></Navigation>
                    <button 
                        type={'button'} 
                        className={`${styles.audioButton} ${player.isPlaying ? styles.audioButtonPlaying : ''}`}
                        onClick={toggleAudioPlayer}
                        aria-label="Open audio player"
                        title="Music Player"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18V5l12-2v13"/>
                            <circle cx="6" cy="18" r="3"/>
                            <circle cx="18" cy="16" r="3"/>
                        </svg>
                    </button>
                    <button type={'button'} className={styles.menuToggle} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>
            <AudioPlayerNew isOpen={isAudioPlayerOpen} onClose={() => setIsAudioPlayerOpen(false)} />
        </>
    )
}
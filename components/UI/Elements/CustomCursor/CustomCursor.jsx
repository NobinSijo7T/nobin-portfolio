'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    // Prevent SSR issues
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !cursorRef.current) return;

        const cursor = cursorRef.current;
        
        // Use quickTo for high performance cursor tracking
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        const handleMouseMove = (e) => {
            // Update cursor position
            xTo(e.clientX);
            yTo(e.clientY);
            
            // Handle hover scaling for interactive elements
            if (e.target && e.target.closest('a, button, input, textarea, select, [role="button"]')) {
                gsap.to(cursor, { scale: 1.15, duration: 0.2 });
            } else {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
            }
        };

        const handleClick = (e) => {
            // Create a ripple element
            const ripple = document.createElement('div');
            ripple.className = styles.ripple;
            document.body.appendChild(ripple);
            
            // Set initial ripple state
            gsap.set(ripple, {
                x: e.clientX,
                y: e.clientY,
                scale: 0,
                opacity: 0.8
            });

            // Animate ripple
            gsap.to(ripple, {
                scale: 2.5,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out',
                onComplete: () => {
                    ripple.remove();
                }
            });

            // Bounce cursor effect
            gsap.fromTo(cursor, { scale: 0.8 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [isClient]);

    // Don't render on server to avoid hydration mismatch
    if (!isClient) return null;

    return (
        <div ref={cursorRef} className={styles.customCursor}>
            <img className={styles.cursorIcon} src="/Cursor.svg" alt="" aria-hidden="true" draggable="false" />
            <div className={styles.cursorLabel}>You</div>
        </div>
    );
}
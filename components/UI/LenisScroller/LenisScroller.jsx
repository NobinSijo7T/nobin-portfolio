'use client';

import React, { useEffect } from 'react';
import Lenis from "@studio-freight/lenis";

export default function LenisScroller() {

    useEffect(() => {
        const lenisScroll = new Lenis({
            lerp: 0.1,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenisScroll.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisScroll.destroy();
        };
    }, []);

    return <></>;
}

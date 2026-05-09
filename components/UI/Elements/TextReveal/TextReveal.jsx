'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from './TextReveal.module.scss';


export default function TextReveal({className, children}) {
    const textRef = useRef();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        document.fonts.ready.then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useGSAP(() => {
        if(textRef.current && fontsLoaded){
            gsap.registerPlugin(ScrollTrigger, SplitText);

            const splitText = new SplitText(textRef.current, {
                type: 'words, lines',
                linesClass: `${styles.splitLine}`,
                lineThreshold: 5,
            });

            const elements = splitText.words;

            gsap.from(elements, {
                scrollTrigger: {
                    trigger: textRef.current,
                    toggleActions: "restart pause resume reverse",
                    start: "top 85%",
                },
                duration: 1,
                autoAlpha: 0,
                ease: "power1.out",
                stagger: 0.01,
            });
        }

    }, { scope: textRef, dependencies: [fontsLoaded] });

    return (
        (
            <p className={`${className}`} ref={textRef}>
                {children}
            </p>
        )
    );
}
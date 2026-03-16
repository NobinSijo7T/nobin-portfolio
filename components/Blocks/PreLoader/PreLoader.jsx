"use client";

import React, { useRef, memo } from 'react';
import styles from './PreLoader.module.scss';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Logo from "@/components/UI/Elements/Logo/Logo";

const PreLoader = ({ onComplete }) => {
    const container = useRef();

    useGSAP(() => {
        gsap.registerPlugin(ScrambleTextPlugin);
        if(container.current){
            const tl = gsap.timeline();
            const tl2 = gsap.timeline();

            // Blobs
            tl.to(`.${styles.badge}`, {
                scale: 1,
                duration: 1,
            });

            // Loader
            tl.to(`.${styles.progress}`, {
                autoAlpha: 1,
                duration: 0.2,
            }, 0);
            tl.to(`.${styles.progress}`, {
                duration: 0.8,
                scrambleText: {
                    text: "LOADING...",
                    revealDelay: 0.1,
                    oldClass: `${styles.old}`,
                },
                onComplete: () => {
                    tl2.to(container.current, {
                        yPercent: -100,
                        duration: 0.6,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if(tl2.progress() >= 0.4){
                                onComplete();
                            }
                        },
                    });
                }
            }, 0);
        }
    }, { scope: container });

    return (
        <section className={styles.container} ref={container}>
            <div className={styles.badge}>
                <Logo></Logo>
            </div>
            <div className={styles.progress}></div>
        </section>
    );
};

export default memo(PreLoader);
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from 'swiper/modules';

import Image from "next/image";

import styles from './Gallery.module.scss';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/free-mode';

import Title from "@/components/UI/Elements/Title/Title";
import ImageTip from "@/components/UI/Elements/ImageTip/ImageTip";
import FancyButton from "@/components/UI/Elements/Button/Button";

import commonConfig from '@/database/config/metadata.json';
import ProjectJourney from '@/database/ProjectJourney.json';
import Container from "@/components/UI/Layout/Layout";
import FadeIn from "@/components/UI/FadeIn/FadeIn";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
export default function Gallery() {
    const swiperRef = useRef();
    const container = useRef();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [clickedCard, setClickedCard] = useState(null);
    const { contextSafe } = useGSAP({scope: container});

    const onEnterAnim = contextSafe((e) => {
        let imageElement = e.currentTarget.querySelector(`.${styles.image}`);

        let rect = e.target.getBoundingClientRect();

        let mouse = {x: 0, y: 0, moved: false};

        mouse.moved = true;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;

        gsap.to(imageElement, {
            duration: 0.5,
            x: (mouse.x - rect.width / 2) / rect.width * -100,
            y: (mouse.y - rect.height / 2) / rect.height * -100
        });
    });
    const handleCardInteraction = (projectId, type, e) => {
        // Prevent event bubbling for touch devices
        if (type === 'click' && e) {
            e.preventDefault();
        }
        
        if (type === 'enter') {
            setHoveredCard(projectId);
        } else if (type === 'leave') {
            setHoveredCard(null);
        } else if (type === 'click') {
            setClickedCard(clickedCard === projectId ? null : projectId);
        }
    };

    const renderActionButtons = (project) => (
        <div className={styles.actionButtons}>
            <Link 
                href={`/project/${project.id}`} 
                className={styles.actionButton}
                aria-label={`View details for ${project.title}`}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                More Details
            </Link>
            
            {project.links.dribbble && (
                <a 
                    href={project.links.dribbble} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                    aria-label={`View ${project.title} on Dribbble`}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.464 5.69-.313-.067-3.463-.744-6.636-.34-.061-.14-.122-.28-.184-.427-.173-.413-.362-.822-.555-1.221 3.434-1.402 5.043-3.382 5.043-3.382l-.132-.32zm-7.568 1.5c2.8 0 5.36 1.07 7.285 2.827-.192.252-1.493 1.927-4.842 3.22C12.123 8.617 9.96 5.9 9.96 5.9c.68-.31 1.41-.498 2.04-.498zm-3.26.74s2.1 2.67 4.522 7.27c-5.75 1.53-10.82 1.48-11.41 1.47 0-.08 0-.16.01-.24.76-3.64 3.06-6.73 6.88-8.5zm8.91 2.54c2.8.36 5.24.11 5.69.02-.2 2.64-1.21 5.06-2.79 6.9-.06-.04-2.86-1.92-5.81-3.26.48-1.21.77-2.35.9-3.66z"/>
                    </svg>
                    Dribbble
                </a>
            )}
            
            {project.links.github && (
                <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                    aria-label={`View ${project.title} source code on GitHub`}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
            )}
            
            {project.links.live && (
                <a 
                    href={project.links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                    aria-label={`View live demo of ${project.title}`}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    Live Demo
                </a>
            )}
        </div>
    );

    const onLeaveAnim = contextSafe((e) => {
        let imageElement = e.currentTarget.querySelector(`.${styles.image}`);
        gsap.to(imageElement, {
            x: 0,
            y: 0,
            duration: 0.5,
        });
    });

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, {scope: container});

    return (
        <section className={styles.section} ref={container}>
            <Blobs type={'v2'} classVariable={`${styles.blob}`}/>
            <Container>
                <header className={styles.header}>
                    <Title color={'white'}><span>My</span> Project <br/>Journal</Title>
                    <FancyButton theme='button-1' target="_blank" link={commonConfig.social.github}>Follow on
                        GitHub</FancyButton>
                </header>
            </Container>

            <Swiper
                slidesPerView={1.2}
                spaceBetween={30}
                slidesOffsetAfter={30}
                slidesOffsetBefore={30}
                freeMode={true}
                modules={[FreeMode]}
                breakpoints={{
                    768: {
                        slidesPerView: 1.8,
                        spaceBetween: 60,
                        slidesOffsetAfter: 60,
                        slidesOffsetBefore: 60,
                    },
                    992: {
                        slidesPerView: 2.5,
                        spaceBetween: 60,
                        slidesOffsetAfter: 60,
                        slidesOffsetBefore: 60,
                    },
                    1600: {
                        slidesPerView: 'auto',
                        spaceBetween: 90,
                        slidesOffsetAfter: 90,
                        slidesOffsetBefore: 90,
                    },
                }}
                touchEventsTarget={'container'}
                className={`${styles.slider} gallerySlider`}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {ProjectJourney.map((project, index) => (
                    <SwiperSlide key={project.id} className={`${styles.sliderItem}`}>
                        <div
                            className={`${styles.projectCard} ${hoveredCard === project.id || clickedCard === project.id ? styles.active : ''}`}
                            onMouseEnter={() => handleCardInteraction(project.id, 'enter')}
                            onMouseLeave={() => handleCardInteraction(project.id, 'leave')}
                            onClick={(e) => handleCardInteraction(project.id, 'click', e)}
                            onTouchEnd={(e) => handleCardInteraction(project.id, 'click', e)}
                        >
                            <figure
                                className={styles.figure}
                                onPointerMove={onEnterAnim}
                                onPointerLeave={onLeaveAnim}>
                                <FadeIn y={50} duration={1.6} autoAlpha={1}>
                                    <Image
                                        src={project.image}
                                        quality={90}
                                        alt={project.title}
                                        width={1400}
                                        height={1600}
                                        loading={"lazy"}
                                        className={`${styles.image} ${styles[project.direction]}`}
                                    />
                                </FadeIn>
                                <ImageTip date={project.company}>{project.title}</ImageTip>
                                
                                <div className={`${styles.overlay} ${hoveredCard === project.id || clickedCard === project.id ? styles.visible : ''}`}>
                                    {renderActionButtons(project)}
                                </div>
                            </figure>
                        </div>
                    </SwiperSlide>
                ))}
                <button onClick={() => swiperRef.current?.slidePrev()} className={styles.buttonPrev}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.96046e-08 32C5.96046e-08 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 5.96046e-08 49.6731 5.96046e-08 32Z"
                            fill="white"/>
                        <path
                            d="M48 31C48.5523 31 49 31.4477 49 32C49 32.5523 48.5523 33 48 33V31ZM17.2929 32.7071C16.9024 32.3166 16.9024 31.6834 17.2929 31.2929L23.6569 24.9289C24.0474 24.5384 24.6805 24.5384 25.0711 24.9289C25.4616 25.3195 25.4616 25.9526 25.0711 26.3431L19.4142 32L25.0711 37.6569C25.4616 38.0474 25.4616 38.6805 25.0711 39.0711C24.6805 39.4616 24.0474 39.4616 23.6569 39.0711L17.2929 32.7071ZM48 33H18V31H48V33Z"
                            fill="black"/>
                    </svg>
                </button>
                <button onClick={() => swiperRef.current?.slideNext()} className={styles.buttonNext}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32Z"
                            fill="white"/>
                        <path
                            d="M16 31C15.4477 31 15 31.4477 15 32C15 32.5523 15.4477 33 16 33V31ZM46.7071 32.7071C47.0976 32.3166 47.0976 31.6834 46.7071 31.2929L40.3431 24.9289C39.9526 24.5384 39.3195 24.5384 38.9289 24.9289C38.5384 25.3195 38.5384 25.9526 38.9289 26.3431L44.5858 32L38.9289 37.6569C38.5384 38.0474 38.5384 38.6805 38.9289 39.0711C39.3195 39.4616 39.9526 39.4616 40.3431 39.0711L46.7071 32.7071ZM16 33H46V31H16V33Z"
                            fill="black"/>
                    </svg>
                </button>
            </Swiper>

            <Container>

            </Container>

        </section>
    );
}
"use client";

import React, { useEffect, useMemo, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ProjectJourney from '@/database/ProjectJourney.json';
import Link from 'next/link';
import Image from 'next/image';
import {
    IconBrandGithub,
    IconBrandDribbble,
    IconExternalLink,
    IconBrandBehance,
    IconArrowLeft,
    IconBrandReact,
    IconBrandNextjs,
    IconBrandNodejs,
    IconBrandMongodb,
    IconBrandJavascript,
    IconBrandTypescript,
    IconBrandCss3,
    IconBrandPython,
    IconBrandVue,
    IconBrandFirebase,
    IconBrandDocker,
    IconBrandPrisma,
    IconBrandStripe,
    IconBrandGraphql,
    IconBrandSpotify,
    IconBrandTailwind,
    IconDatabase,
    IconCode,
    IconBracketsAngle
} from "@tabler/icons-react";
import styles from './project-details.module.scss';
import PixelBlast from '@/components/UI/PixelBlast/PixelBlast';
import ImageVideo from '@/database/ImageVideo.json';

const FALLBACK_IMAGE = '/img_home.jpeg';

const resolveImageSrc = (src) => {
    if (!src) return FALLBACK_IMAGE;
    const normalized = src.startsWith('/') ? src : `/${src}`;
    return encodeURI(normalized);
};

const getProjectId = async (params) => {
    if (!params) return null;
    if (typeof params.then === 'function') {
        const resolved = await params;
        return resolved?.id ?? null;
    }
    return params?.id ?? null;
};

// Map tech name → icon component
const getTechIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('react')) return IconBrandReact;
    if (lower.includes('next')) return IconBrandNextjs;
    if (lower.includes('node')) return IconBrandNodejs;
    if (lower.includes('mongo')) return IconBrandMongodb;
    if (lower === 'javascript' || lower === 'js') return IconBrandJavascript;
    if (lower.includes('typescript')) return IconBrandTypescript;
    if (lower.includes('css')) return IconBrandCss3;
    if (lower.includes('python')) return IconBrandPython;
    if (lower.includes('vue')) return IconBrandVue;
    if (lower.includes('firebase')) return IconBrandFirebase;
    if (lower.includes('docker')) return IconBrandDocker;
    if (lower.includes('prisma')) return IconBrandPrisma;
    if (lower.includes('stripe')) return IconBrandStripe;
    if (lower.includes('graphql')) return IconBrandGraphql;
    if (lower.includes('spotify')) return IconBrandSpotify;
    if (lower.includes('tailwind')) return IconBrandTailwind;
    if (lower.includes('sql') || lower.includes('database') || lower.includes('postgre')) return IconDatabase;
    return IconCode;
};

// Link config
const linkConfig = {
    github: { icon: IconBrandGithub, label: 'GitHub' },
    dribbble: { icon: IconBrandDribbble, label: 'Dribbble' },
    behance: { icon: IconBrandBehance, label: 'Behance' },
    live: { icon: IconExternalLink, label: 'Live Site' },
};

export default function ProjectDetails({ params }) {
    const [projectId, setProjectId] = useState(null);
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const detailsRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        getProjectId(params).then((id) => {
            if (mounted) {
                setProjectId(id);
            }
        });

        return () => {
            mounted = false;
        };
    }, [params]);

    const project = useMemo(() => {
        if (!projectId) return null;
        return ProjectJourney.find((proj) => proj.id === projectId) ?? null;
    }, [projectId]);

    // Entrance animations
    useGSAP(() => {
        if (!project || !containerRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Hero elements
        tl.from(heroRef.current?.querySelectorAll('[data-anim]') || [], {
            y: 60,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
        });

        // Image
        if (imageRef.current) {
            tl.from(imageRef.current, {
                y: 80,
                opacity: 0,
                scale: 0.95,
                duration: 1,
            }, '-=0.5');
        }

        // Details section
        if (detailsRef.current) {
            tl.from(detailsRef.current.querySelectorAll('[data-anim-detail]') || [], {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
            }, '-=0.6');
        }
    }, { scope: containerRef, dependencies: [project] });

    // Not found
    if (!projectId) {
        return null;
    }

    if (!project) {
        return null;
    }

    // Collect active links
    const activeLinks = project
        ? Object.entries(project.links)
            .filter(([, url]) => url)
            .map(([key, url]) => ({ key, url, ...linkConfig[key] }))
        : [];

    const galleryItems = project
        ? ImageVideo.filter((item) => item.location?.toLowerCase() === project.title?.toLowerCase())
        : [];
    const gallery = galleryItems.length > 0
        ? galleryItems
        : [{ url: project.image, location: project.title, direction: project.direction }];

    // Find adjacent projects for navigation
    const currentIndex = ProjectJourney.findIndex(p => p.id === project?.id);
    const prevProject = currentIndex > 0 ? ProjectJourney[currentIndex - 1] : null;
    const nextProject = currentIndex < ProjectJourney.length - 1 ? ProjectJourney[currentIndex + 1] : null;

    return (
        <div className={styles.page} ref={containerRef}>
            <ProjectPageBackground />

            {/* ═══ HERO ═══ */}
            <section className={styles.hero} ref={heroRef}>
                <div className={styles.heroInner}>
                    <div className={styles.backRow} data-anim>
                        <Link href="/projects" className={styles.backButton}>
                            <IconArrowLeft size={20} />
                            <span>All Projects</span>
                        </Link>
                    </div>

                    <div className={styles.heroGrid}>
                        <div className={styles.heroContent}>
                            {project.company && (
                                <span className={styles.companyBadge} data-anim>
                                    {project.company}
                                </span>
                            )}

                            <h1 className={styles.title} data-anim>
                                {project.title}
                            </h1>

                            <p className={styles.description} data-anim>
                                {project.description}
                            </p>

                            <div className={styles.metaRow} data-anim>
                                <div className={styles.metaCard}>
                                    <span>Focus</span>
                                    <strong>{project.company || 'Independent'}</strong>
                                </div>
                                <div className={styles.metaCard}>
                                    <span>Stack</span>
                                    <strong>{project.technologies?.length || 0} tools</strong>
                                </div>
                                <div className={styles.metaCard}>
                                    <span>Links</span>
                                    <strong>{activeLinks.length}</strong>
                                </div>
                            </div>

                            {activeLinks.length > 0 && (
                                <div className={styles.heroLinks} data-anim>
                                    {activeLinks.map(({ key, url, icon: Icon, label }) => (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.heroLink}
                                            title={label}
                                        >
                                            <Icon size={20} />
                                            <span>{label}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.heroMedia} ref={imageRef} data-anim>
                            <div className={styles.mediaFrame}>
                                <Image
                                    src={resolveImageSrc(project.image)}
                                    alt={`${project.title} preview`}
                                    fill
                                    sizes="(max-width: 900px) 100vw, 50vw"
                                    className={styles.mediaImage}
                                    priority
                                    unoptimized
                                    onError={(event) => {
                                        const target = event.currentTarget;
                                        if (!target.dataset.fallbackApplied) {
                                            target.dataset.fallbackApplied = 'true';
                                            target.src = FALLBACK_IMAGE;
                                        }
                                    }}
                                />
                                <div className={styles.mediaShade} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ DETAILS GRID ═══ */}
            <section className={styles.details} ref={detailsRef}>
                <div className={styles.detailsInner}>
                    <div className={styles.detailsMain}>
                        <div className={styles.detailBlock} data-anim-detail>
                            <h2 className={styles.detailLabel}>Project overview</h2>
                            <p className={styles.detailText}>{project.description}</p>
                        </div>

                        <div className={styles.detailBlock} data-anim-detail>
                            <h2 className={styles.detailLabel}>Capabilities</h2>
                            <div className={styles.capabilityList}>
                                {project.technologies.map((tech) => (
                                    <span key={tech} className={styles.capabilityChip}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className={styles.detailsSidebar}>
                        <div className={styles.detailBlock} data-anim-detail>
                            <h2 className={styles.detailLabel}>Technology stack</h2>
                            <div className={styles.techGrid}>
                                {project.technologies.map((tech, i) => {
                                    const Icon = getTechIcon(tech);
                                    return (
                                        <div key={i} className={styles.techChip}>
                                            <Icon size={18} stroke={1.5} />
                                            <span>{tech}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {activeLinks.length > 0 && (
                            <div className={styles.detailBlock} data-anim-detail>
                                <h2 className={styles.detailLabel}>External links</h2>
                                <div className={styles.linkCards}>
                                    {activeLinks.map(({ key, url, icon: Icon, label }) => (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.linkCard}
                                        >
                                            <div className={styles.linkCardIcon}>
                                                <Icon size={24} />
                                            </div>
                                            <div className={styles.linkCardInfo}>
                                                <span className={styles.linkCardLabel}>{label}</span>
                                                <span className={styles.linkCardUrl}>
                                                    {url.replace(/^https?:\/\/(www\.)?/, '').split('/').slice(0, 2).join('/')}
                                                </span>
                                            </div>
                                            <IconExternalLink size={16} className={styles.linkCardArrow} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </section>

            {gallery.length > 0 && (
                <section className={styles.gallery} aria-label="Project gallery">
                    <div className={styles.galleryInner}>
                        <div className={styles.galleryHeader}>
                            <h2 className={styles.galleryTitle}>Gallery</h2>
                            <p className={styles.gallerySubtitle}>Selected screens and visual moments.</p>
                        </div>
                        <div className={styles.galleryGrid}>
                            {gallery.map((item, index) => (
                                <div
                                    key={`${item.url}-${index}`}
                                    className={`${styles.galleryItem} ${
                                        item.direction === 'vertical' ? styles.galleryPortrait : styles.galleryLandscape
                                    }`}
                                >
                                    <Image
                                        src={resolveImageSrc(item.url || project.image)}
                                        alt={`${project.title} ${index + 1}`}
                                        fill
                                        sizes="(max-width: 900px) 100vw, 70vw"
                                        className={styles.galleryImage}
                                        unoptimized
                                        onError={(event) => {
                                            const target = event.currentTarget;
                                            if (!target.dataset.fallbackApplied) {
                                                target.dataset.fallbackApplied = 'true';
                                                target.src = FALLBACK_IMAGE;
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ PROJECT NAVIGATION ═══ */}
            <section className={styles.projectNav}>
                <div className={styles.projectNavInner}>
                    {prevProject ? (
                        <a href={`/project/${prevProject.id}`} className={styles.navPrev}>
                            <span className={styles.navDirection}>← Previous</span>
                            <span className={styles.navTitle}>{prevProject.title}</span>
                        </a>
                    ) : <div />}
                    {nextProject ? (
                        <a href={`/project/${nextProject.id}`} className={styles.navNext}>
                            <span className={styles.navDirection}>Next →</span>
                            <span className={styles.navTitle}>{nextProject.title}</span>
                        </a>
                    ) : <div />}
                </div>
            </section>
        </div>
    );
}

function ProjectPageBackground() {
    return (
        <div className={styles.background} aria-hidden="true">
            <div className={styles.pixelBlastLayer}>
                <PixelBlast
                    variant="circle"
                    pixelSize={5}
                    color="#E8836A"
                    patternScale={2.1}
                    patternDensity={2.25}
                    pixelSizeJitter={0.26}
                    enableRipples
                    rippleSpeed={0.22}
                    rippleThickness={0.08}
                    rippleIntensityScale={0.42}
                    liquid
                    liquidStrength={0.026}
                    liquidRadius={0.85}
                    liquidWobbleSpeed={2.5}
                    speed={0.3}
                    edgeFade={0.38}
                    transparent
                />
            </div>
            <div className={styles.backgroundShade} />
        </div>
    );
}

"use client";

import React, { useEffect, useMemo, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectJourney from '@/database/ProjectJourney.json';
import ImageVideo from '@/database/ImageVideo.json';
import Link from 'next/link';
import Image from 'next/image';
import {
    IconBrandGithub,
    IconBrandDribbble,
    IconExternalLink,
    IconBrandBehance,
    IconArrowLeft,
    IconArrowRight,
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
    IconPalette,
    IconVectorBezier2,
} from "@tabler/icons-react";
import styles from './project-details.module.scss';

gsap.registerPlugin(ScrollTrigger);

// ─── Helpers ────────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = '/reveal-image.png';

const resolveImageSrc = (src) => {
    if (!src) return FALLBACK_IMAGE;
    const normalized = src.startsWith('/') ? src : `/${src}`;
    return encodeURI(normalized);
};

const getTechIcon = (name) => {
    const l = name.toLowerCase();
    if (l.includes('react')) return IconBrandReact;
    if (l.includes('next')) return IconBrandNextjs;
    if (l.includes('node')) return IconBrandNodejs;
    if (l.includes('mongo')) return IconBrandMongodb;
    if (l === 'javascript' || l === 'js') return IconBrandJavascript;
    if (l.includes('typescript')) return IconBrandTypescript;
    if (l.includes('css')) return IconBrandCss3;
    if (l.includes('python')) return IconBrandPython;
    if (l.includes('vue')) return IconBrandVue;
    if (l.includes('firebase')) return IconBrandFirebase;
    if (l.includes('docker')) return IconBrandDocker;
    if (l.includes('prisma')) return IconBrandPrisma;
    if (l.includes('stripe')) return IconBrandStripe;
    if (l.includes('graphql')) return IconBrandGraphql;
    if (l.includes('spotify')) return IconBrandSpotify;
    if (l.includes('tailwind')) return IconBrandTailwind;
    if (l.includes('figma') || l.includes('ui') || l.includes('design') || l.includes('branding') || l.includes('identity')) return IconPalette;
    if (l.includes('web3') || l.includes('visual')) return IconVectorBezier2;
    if (l.includes('sql') || l.includes('database') || l.includes('postgre')) return IconDatabase;
    return IconCode;
};

const linkConfig = {
    github:   { icon: IconBrandGithub,   label: 'GitHub' },
    dribbble: { icon: IconBrandDribbble, label: 'Dribbble' },
    behance:  { icon: IconBrandBehance,  label: 'Behance' },
    live:     { icon: IconExternalLink,  label: 'Live Site' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProjectDetails({ params }) {
    const [projectId, setProjectId] = useState(null);
    const pageRef    = useRef(null);
    const heroRef    = useRef(null);
    const contentRef = useRef(null);

    // Resolve async params (Next.js 15)
    useEffect(() => {
        let alive = true;
        Promise.resolve(params).then((p) => {
            if (alive) setProjectId(p?.id ?? null);
        });
        return () => { alive = false; };
    }, [params]);

    const project = useMemo(
        () => ProjectJourney.find((p) => p.id === projectId) ?? null,
        [projectId]
    );

    // Entrance animations
    useGSAP(() => {
        if (!project || !pageRef.current) return;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(heroRef.current?.querySelectorAll('[data-anim]') ?? [], {
            y: 50, opacity: 0, stagger: 0.1, duration: 0.8,
        });

        tl.from(contentRef.current?.querySelectorAll('[data-block]') ?? [], {
            y: 40, opacity: 0, stagger: 0.08, duration: 0.7,
        }, '-=0.4');
    }, { scope: pageRef, dependencies: [project] });

    // Loading / not-found states
    if (!projectId) return null;
    if (!project)   return (
        <div className={styles.notFound}>
            <p>Project not found.</p>
            <Link href="/projects" className={styles.backButton}>
                <IconArrowLeft size={18} /> Back to projects
            </Link>
        </div>
    );

    // Derived data
    const activeLinks = Object.entries(project.links ?? {})
        .filter(([, url]) => Boolean(url))
        .map(([key, url]) => ({ key, url, ...linkConfig[key] }));

    const galleryItems = ImageVideo.filter(
        (item) => item.location?.toLowerCase() === project.title?.toLowerCase()
    );
    const gallery = galleryItems.length > 0 ? galleryItems : [];

    const currentIndex  = ProjectJourney.findIndex((p) => p.id === project.id);
    const prevProject   = currentIndex > 0 ? ProjectJourney[currentIndex - 1] : null;
    const nextProject   = currentIndex < ProjectJourney.length - 1 ? ProjectJourney[currentIndex + 1] : null;

    return (
        <div className={styles.page} ref={pageRef}>
            {/* ── Background ── */}
            <div className={styles.bg} aria-hidden="true">
                <div className={styles.bgGlow1} />
                <div className={styles.bgGlow2} />
                <div className={styles.bgNoise} />
            </div>

            {/* ══════════════════════════════
                HERO
            ══════════════════════════════ */}
            <section className={styles.hero} ref={heroRef}>
                <div className={styles.inner}>

                    {/* Back button */}
                    <Link href="/projects" className={styles.backButton} data-anim>
                        <IconArrowLeft size={16} />
                        <span>All projects</span>
                    </Link>

                    {/* Two-column hero */}
                    <div className={styles.heroGrid}>

                        {/* Left: text */}
                        <div className={styles.heroText}>
                            {project.company && (
                                <span className={styles.badge} data-anim>{project.company}</span>
                            )}

                            <h1 className={styles.heroTitle} data-anim>{project.title}</h1>

                            <p className={styles.heroDesc} data-anim>{project.description}</p>

                            {/* Stat pills */}
                            <div className={styles.statRow} data-anim>
                                <div className={styles.statPill}>
                                    <span className={styles.statLabel}>Stack</span>
                                    <span className={styles.statValue}>{project.technologies?.length ?? 0} tools</span>
                                </div>
                                {activeLinks.length > 0 && (
                                    <div className={styles.statPill}>
                                        <span className={styles.statLabel}>Links</span>
                                        <span className={styles.statValue}>{activeLinks.length}</span>
                                    </div>
                                )}
                                {project.company && (
                                    <div className={styles.statPill}>
                                        <span className={styles.statLabel}>For</span>
                                        <span className={styles.statValue}>{project.company}</span>
                                    </div>
                                )}
                            </div>

                            {/* CTA links */}
                            {activeLinks.length > 0 && (
                                <div className={styles.ctaRow} data-anim>
                                    {activeLinks.map(({ key, url, icon: Icon, label }) => (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={key === 'live' ? styles.ctaPrimary : styles.ctaSecondary}
                                        >
                                            <Icon size={18} />
                                            <span>{label}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: image */}
                        <div className={styles.heroImage} data-anim>
                            <div className={styles.imageFrame}>
                                <Image
                                    src={resolveImageSrc(project.image)}
                                    alt={`${project.title} preview`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className={styles.img}
                                    priority
                                    unoptimized
                                    onError={(e) => {
                                        if (!e.currentTarget.dataset.fb) {
                                            e.currentTarget.dataset.fb = '1';
                                            e.currentTarget.src = FALLBACK_IMAGE;
                                        }
                                    }}
                                />
                                <div className={styles.imageSheen} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
                CONTENT GRID
            ══════════════════════════════ */}
            <section className={styles.content} ref={contentRef}>
                <div className={styles.inner}>
                    <div className={styles.contentGrid}>

                        {/* ── Main column ── */}
                        <div className={styles.mainCol}>

                            {/* Overview */}
                            <div className={styles.block} data-block>
                                <h2 className={styles.blockTitle}>Overview</h2>
                                <p className={styles.blockText}>{project.description}</p>
                            </div>

                            {/* Tech tags */}
                            <div className={styles.block} data-block>
                                <h2 className={styles.blockTitle}>Technologies</h2>
                                <div className={styles.techWrap}>
                                    {project.technologies.map((tech) => {
                                        const Icon = getTechIcon(tech);
                                        return (
                                            <span key={tech} className={styles.techChip}>
                                                <Icon size={15} stroke={1.5} />
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ── Sidebar ── */}
                        <aside className={styles.sidebar}>

                            {/* External links */}
                            {activeLinks.length > 0 && (
                                <div className={styles.block} data-block>
                                    <h2 className={styles.blockTitle}>Links</h2>
                                    <div className={styles.linkList}>
                                        {activeLinks.map(({ key, url, icon: Icon, label }) => (
                                            <a
                                                key={key}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.linkItem}
                                            >
                                                <div className={styles.linkIcon}><Icon size={20} /></div>
                                                <div className={styles.linkMeta}>
                                                    <span className={styles.linkLabel}>{label}</span>
                                                    <span className={styles.linkUrl}>
                                                        {url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                                    </span>
                                                </div>
                                                <IconExternalLink size={14} className={styles.linkArrow} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Project info card */}
                            <div className={styles.infoCard} data-block>
                                <div className={styles.infoRow}>
                                    <span>Client</span>
                                    <strong>{project.company || 'Independent'}</strong>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>Tools used</span>
                                    <strong>{project.technologies?.length ?? 0}</strong>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>Category</span>
                                    <strong>
                                        {project.technologies?.some(t =>
                                            ['figma','ui','design','branding','ux'].some(k => t.toLowerCase().includes(k))
                                        ) ? 'Design' : 'Development'}
                                    </strong>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
                GALLERY
            ══════════════════════════════ */}
            {gallery.length > 0 && (
                <section className={styles.gallery}>
                    <div className={styles.inner}>
                        <div className={styles.galleryHeader} data-block>
                            <h2 className={styles.galleryTitle}>Gallery</h2>
                            <p className={styles.gallerySubtitle}>Selected screens &amp; visual moments</p>
                        </div>
                        <div className={styles.galleryGrid}>
                            {gallery.map((item, i) => (
                                <div
                                    key={`${item.url}-${i}`}
                                    className={`${styles.galleryItem} ${item.direction === 'vertical' ? styles.portrait : styles.landscape}`}
                                >
                                    <Image
                                        src={resolveImageSrc(item.url || project.image)}
                                        alt={`${project.title} – screen ${i + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        className={styles.galleryImg}
                                        unoptimized
                                        onError={(e) => {
                                            if (!e.currentTarget.dataset.fb) {
                                                e.currentTarget.dataset.fb = '1';
                                                e.currentTarget.src = FALLBACK_IMAGE;
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════
                PREV / NEXT NAV
            ══════════════════════════════ */}
            <nav className={styles.projectNav} aria-label="Project navigation">
                <div className={styles.inner}>
                    <div className={styles.navRow}>
                        {prevProject ? (
                            <Link href={`/project/${prevProject.id}`} className={styles.navCard}>
                                <IconArrowLeft size={18} />
                                <div>
                                    <span className={styles.navDir}>Previous</span>
                                    <span className={styles.navName}>{prevProject.title}</span>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextProject ? (
                            <Link href={`/project/${nextProject.id}`} className={`${styles.navCard} ${styles.navCardRight}`}>
                                <div>
                                    <span className={styles.navDir}>Next</span>
                                    <span className={styles.navName}>{nextProject.title}</span>
                                </div>
                                <IconArrowRight size={18} />
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </nav>
        </div>
    );
}

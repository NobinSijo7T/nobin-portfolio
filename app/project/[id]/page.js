"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ProjectJourney from '@/database/ProjectJourney.json';
import Link from 'next/link';
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
    const router = useRouter();
    const [project, setProject] = useState(null);
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const detailsRef = useRef(null);

    useEffect(() => {
        params.then(p => {
            const found = ProjectJourney.find(proj => proj.id === p.id);
            setProject(found);
        });
    }, [params]);

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
    if (project === undefined) {
        return null; // loading
    }

    if (project === null) {
        return null;
    }

    // Collect active links
    const activeLinks = project
        ? Object.entries(project.links)
            .filter(([, url]) => url)
            .map(([key, url]) => ({ key, url, ...linkConfig[key] }))
        : [];

    // Find adjacent projects for navigation
    const currentIndex = ProjectJourney.findIndex(p => p.id === project?.id);
    const prevProject = currentIndex > 0 ? ProjectJourney[currentIndex - 1] : null;
    const nextProject = currentIndex < ProjectJourney.length - 1 ? ProjectJourney[currentIndex + 1] : null;

    return (
        <div className={styles.page} ref={containerRef}>
            {/* ═══ HERO ═══ */}
            <section className={styles.hero} ref={heroRef}>
                <div className={styles.heroInner}>
                    {/* Back button */}
                    <div className={styles.backRow} data-anim>
                        <Link href="/projects" className={styles.backButton}>
                            <IconArrowLeft size={20} />
                            <span>All Projects</span>
                        </Link>
                    </div>

                    {/* Company badge */}
                    {project.company && (
                        <span className={styles.companyBadge} data-anim>
                            {project.company}
                        </span>
                    )}

                    {/* Title */}
                    <h1 className={styles.title} data-anim>
                        {project.title}
                    </h1>

                    {/* Description */}
                    <p className={styles.description} data-anim>
                        {project.description}
                    </p>

                    {/* Quick links row */}
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
            </section>

            {/* ═══ PROJECT IMAGE ═══ */}
            <section className={styles.imageSection} ref={imageRef}>
                <div className={styles.imageFrame}>
                    <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className={styles.projectImage}
                        draggable="false"
                    />
                    <div className={styles.imageGlow} />
                </div>
            </section>

            {/* ═══ DETAILS GRID ═══ */}
            <section className={styles.details} ref={detailsRef}>
                <div className={styles.detailsInner}>
                    {/* Tech stack */}
                    <div className={styles.detailBlock} data-anim-detail>
                        <h2 className={styles.detailLabel}>Technology Stack</h2>
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

                    {/* External links - expanded cards */}
                    {activeLinks.length > 0 && (
                        <div className={styles.detailBlock} data-anim-detail>
                            <h2 className={styles.detailLabel}>External Links</h2>
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
                </div>
            </section>

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

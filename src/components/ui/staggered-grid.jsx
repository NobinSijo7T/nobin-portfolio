import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/lib/utils'
import { Github, Slack, Twitter } from 'lucide-react'
import {
    IconBrandReact, IconBrandNextjs, IconBrandNodejs, IconBrandMongodb,
    IconBrandJavascript, IconBrandTypescript, IconBrandCss3, IconBrandPython,
    IconBrandVue, IconBrandFirebase, IconBrandDocker, IconBrandPrisma,
    IconBrandStripe, IconBrandGraphql, IconBrandSpotify, IconBrandTailwind,
    IconDatabase, IconCode, IconBracketsAngle
} from "@tabler/icons-react";

const techDescriptions = {
    'React': "A JavaScript library for building user interfaces.",
    'Next.js': "The React Framework for the Web.",
    'Node.js': "JavaScript runtime built on Chrome's V8 engine.",
    'MongoDB': "NoSQL database program, using JSON-like documents.",
    'JavaScript': "High-level, interpreted programming language.",
    'TypeScript': "Strongly typed programming language that builds on JS.",
    'CSS3': "Style sheet language used for describing the presentation.",
    'Python': "High-level, general-purpose programming language.",
    'Vue.js': "An approachable, performant and versatile framework.",
    'Firebase': "App development platform that helps build and grow.",
    'Docker': "OS-level virtualization to deliver software in packages.",
    'Prisma': "Next-generation Node.js and TypeScript ORM.",
    'Stripe': "Payment processing platform for the internet.",
    'GraphQL': "A query language for your API.",
    'Spotify API': "Web API to fetch data from the Spotify music catalog.",
    'Tailwind CSS': "A utility-first CSS framework.",
    'Tailwind': "A utility-first CSS framework.",
    'SQL': "Standard language for storing, manipulating and retrieving data.",
    'Canvas API': "Means for drawing graphics via JavaScript and HTML.",
    'PostgreSQL': "Advanced open source relational database.",
    'Express': "Fast, unopinionated, minimalist web framework.",
    'Mapbox': "Custom online maps for websites and applications.",
    'Socket.io': "Enables real-time, bidirectional and event-based communication.",
    'TensorFlow': "End-to-end open source machine learning platform.",
    'FastAPI': "Modern, fast web framework for building APIs with Python.",
    'Local Storage': "Web storage API for storing data locally in the browser.",
};

gsap.registerPlugin(ScrollTrigger)

export function StaggeredGrid({
    images,
    bentoItems,
    centerText = "Halcyon",

    credits = {
        madeBy: { text: "@codrops", href: "https://x.com/codrops" },
        moreDemos: { text: "More demos", href: "https://tympanus.net/codrops/demos" }
    },

    className,
    showFooter = true,
    projectTitle,
    projectCompany,
    projectDescription,
    techStack = [],
    children
}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef(null)
    const textRef = useRef(null)

    // Bento Grid State
    const [activeBento, setActiveBento] = useState(0);

    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>{char === ' ' ? '\u00A0' : char}</span>
        ));
    }

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        // Wait for background images to load
        // Note: we target both regular images and bento images if possible
        const imgLoad = imagesLoaded(
            document.querySelectorAll('.grid__item-img'),
            { background: true },
            handleLoad
        )

        return () => {
            // Cleanup
        }
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        // Animate Text Element
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll('.char')
            gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top bottom',
                    end: 'center center-=25%',
                    scrub: 1,
                }
            })
                .from(chars, {
                    ease: 'sine.out',
                    yPercent: 300,
                    autoAlpha: 0,
                    stagger: {
                        each: 0.05,
                        from: 'center'
                    }
                })
        }

        // Animate Full Grid
        if (gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
            const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns').split(' ').length
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item, index) => {
                const columnIndex = index % numColumns
                columns[columnIndex].push(item)
            })

            columns.forEach((columnItems, columnIndex) => {
                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                })
                    .from(columnItems, {
                        yPercent: 450,
                        autoAlpha: 0,
                        delay: delayFactor,
                        ease: 'sine.out',
                    })
                    .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0)
            })

            // Specific animation for Bento Container (removed since we place it outside now)
        }
    }, [isLoaded])

    // Prepare grid items: mix images and bento items
    // We want to fill up to index 20 (end of row 3) but not necessarily the rows below
    // [...images, ...images] gives 20 items (indices 0-19). We need one more for index 20.
    const mixedGridItems = [...images, ...images, images[0]].slice(0, 35);

    return (
        <div
            className={cn("shadow relative overflow-hidden w-full", className)}
            style={{
                '--grid-item-translate': '0px'
            }}>
            {/* Project Title (Yellow, Large) and Description - AT THE TOP, CENTERED */}
            {projectTitle && (
                <section className="relative z-30 px-6 w-full min-h-[100vh] flex flex-col justify-center items-center py-20">
                    <div className="max-w-6xl w-full mx-auto text-center flex flex-col items-center">
                        {/* Project Title in Yellow - Very Large */}
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-yellow-400 mb-6 tracking-tight text-center">
                            {projectTitle}
                        </h1>
                        {/* Company Name */}
                        {projectCompany && (
                            <p className="text-2xl md:text-3xl text-gray-400 mb-10 font-medium text-center">
                                {projectCompany}
                            </p>
                        )}
                        {/* Project Description */}
                        {projectDescription && (
                            <div className="max-w-4xl mx-auto mb-16">
                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center">
                                    {projectDescription}
                                </p>
                            </div>
                        )}

                        {/* Bento Items (Tech stack + Details) - Below the description */}
                        {bentoItems && bentoItems.length > 0 && (
                            <div className="w-full max-w-5xl h-[350px] md:h-[450px] mb-12 flex items-center justify-center gap-2">
                                {bentoItems.map((bentoItem, index) => {
                                    const isActive = activeBento === index;
                                    const activeWidth = 60;
                                    const inactiveWidth = bentoItems.length > 1 ? (100 - activeWidth) / (bentoItems.length - 1) : 100;
                                    return (
                                        <div
                                            key={bentoItem.id}
                                            className={cn(
                                                "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                                isActive
                                                    ? "bg-zinc-900/10 shadow-2xl"
                                                    : "bg-zinc-950"
                                            )}
                                            style={{ width: isActive ? `${activeWidth}%` : `${inactiveWidth}%` }}
                                            onMouseEnter={() => setActiveBento(index)}
                                            onClick={() => setActiveBento(index)}>
                                            {/* Border Overlay - Fixes edge artifacts by sitting on top */}
                                            <div
                                                className={cn(
                                                    "absolute inset-0 rounded-2xl border z-50 pointer-events-none transition-colors duration-700",
                                                    isActive
                                                        ? "border-zinc-500/50"
                                                        : "border-zinc-800/50 group-hover:border-zinc-700"
                                                )} />
                                            {/* Content Container */}
                                            <div className="relative z-10 w-full h-full flex flex-col p-0">
                                                {/* Active State Content */}
                                                <div
                                                    className={cn(
                                                        "absolute inset-0 flex flex-col transition-all duration-500 ease-in-out",
                                                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                                                    )}>
                                                    {/* Image - Full Coverage */}
                                                    <div className="absolute inset-0 bg-zinc-900 overflow-hidden z-0 group/img">
                                                        {bentoItem.image && (
                                                            <>
                                                                <img
                                                                    src={bentoItem.image}
                                                                    alt={bentoItem.title}
                                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 group-hover/img:opacity-100" />
                                                                {/* Text Protection Gradient - Shadow peaking from bottom */}
                                                                <div
                                                                    className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                                                            </>
                                                        )}
                                                    </div>

                                                    {/* Footer Row - Full Width with Shadow */}
                                                    <div
                                                        className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-between px-5 z-20">


                                                        <div className="flex flex-col relative z-10">
                                                            <h3
                                                                className="text-sm font-bold text-white drop-shadow-md leading-none tracking-tight">{bentoItem.title}</h3>
                                                        </div>
                                                        <div
                                                            className="text-white/90 transition-colors hover:text-white drop-shadow-md relative z-10">
                                                            {bentoItem.icon}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Inactive State - Icon + Title - Centered */}
                                            <div
                                                className={cn(
                                                    "absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                                                    isActive ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                                                )}>
                                                <div className="text-white/50 group-hover:text-white transition-colors">
                                                    {bentoItem.icon}
                                                </div>
                                                <span
                                                    className="text-[10px] sm:text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-wider hidden sm:block">{bentoItem.title}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Quick links and extra elements passed as children */}
                        {children}
                    </div>
                </section>
            )}

            {/* Animated Grid Section - BELOW THE TITLE */}
            <section className="grid place-items-center w-full relative mt-10">
                <div
                    ref={textRef}
                    className="text font-alt uppercase flex content-center text-[clamp(2rem,8vw,6rem)] leading-[0.7] text-neutral-900 dark:text-white opacity-30">
                    {splitText(centerText)}
                </div>
            </section>
            <section className="grid place-items-center w-full relative">
                <div
                    ref={gridFullRef}
                    className="grid--full relative w-full my-[10vh] h-auto aspect-[1.1] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-5">
                    <div
                        className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 dark:bg-black/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (item === 'BENTO_GROUP') {
                            return null;
                        }

                        // Skip rendering for the slots that the group takes up
                        // Group starts at 16, takes 17, 18.
                        if (i === 17 || i === 18) return null;

                        if (typeof item === 'string') {
                            let Icon = IconCode;
                            let label = "Tech";
                            let description = "Technology used in this project.";

                            if (techStack && techStack.length > 0) {
                                const techIndex = i % techStack.length;
                                const techItem = techStack[techIndex];
                                label = techItem ? techItem.name : "Tech";
                                description = techDescriptions[label] || `A tool used for building this project.`;

                                const lowerName = label.toLowerCase();
                                if (lowerName.includes('react')) Icon = IconBrandReact;
                                else if (lowerName.includes('next.js')) Icon = IconBrandNextjs;
                                else if (lowerName.includes('node.js')) Icon = IconBrandNodejs;
                                else if (lowerName.includes('mongodb')) Icon = IconBrandMongodb;
                                else if (lowerName.includes('javascript') || lowerName.includes('js')) Icon = IconBrandJavascript;
                                else if (lowerName.includes('typescript')) Icon = IconBrandTypescript;
                                else if (lowerName.includes('css')) Icon = IconBrandCss3;
                                else if (lowerName.includes('python')) Icon = IconBrandPython;
                                else if (lowerName.includes('vue')) Icon = IconBrandVue;
                                else if (lowerName.includes('firebase')) Icon = IconBrandFirebase;
                                else if (lowerName.includes('docker')) Icon = IconBrandDocker;
                                else if (lowerName.includes('prisma')) Icon = IconBrandPrisma;
                                else if (lowerName.includes('stripe')) Icon = IconBrandStripe;
                                else if (lowerName.includes('graphql')) Icon = IconBrandGraphql;
                                else if (lowerName.includes('spotify')) Icon = IconBrandSpotify;
                                else if (lowerName.includes('tailwind')) Icon = IconBrandTailwind;
                                else if (lowerName.includes('sql') || lowerName.includes('database')) Icon = IconDatabase;
                                else Icon = IconBracketsAngle;
                            } else {
                                Icon = i % 3 === 0 ? Github : i % 3 === 1 ? Slack : Twitter;
                                label = i % 3 === 0 ? "Github" : i % 3 === 1 ? "Slack" : "Twitter";
                                description = `A standard tool for development teams.`;
                            }

                            return (
                                <figure
                                    key={`img-${i}`}
                                    className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer">
                                    <div
                                        className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-transparent">

                                        {/* Gradient Overlay for Hover */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                        {/* Content Container - Inactive state */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10">
                                            <Icon className="w-10 h-10 text-zinc-400 dark:text-zinc-500" stroke={1.5} />
                                        </div>

                                        {/* Hover Content */}
                                        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-4 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-500 delay-75">
                                            {/* Top Icon and Label */}
                                            <div className="flex flex-col items-center mb-2">
                                                <Icon className="w-8 h-8 text-white mb-1" stroke={1.5} />
                                                <span className="text-sm font-bold text-white tracking-tight text-center">{label}</span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-[10px] text-zinc-300 text-center leading-tight">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </figure>
                            );
                        }
                        return null;
                    })}
                </div>
            </section >

            {showFooter && (
                <footer
                    className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-neutral-900 dark:text-white uppercase font-medium text-xs tracking-wider">
                    <a
                        href={credits.madeBy.href}
                        className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                    <a
                        href={credits.moreDemos.href}
                        className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div >
    );
}

export default StaggeredGrid

import React, { useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/UI/FadeIn/FadeIn";
import { FloatingDock } from "@/src/components/ui/floating-dock";
import styles from "./ProjectJourneyCard.module.scss";

export default function ProjectJourneyCard({
    project,
    dockItems,
    onFigurePointerMove,
    onFigurePointerLeave,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const isActive = isHovered || isClicked;

    const handleCardClick = (event) => {
        event.preventDefault();
        setIsClicked((prev) => !prev);
    };

    return (
        <div
            className={`${styles.projectCard} ${isActive ? styles.active : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
            onTouchEnd={handleCardClick}
        >
            <figure
                className={styles.figure}
                onPointerMove={onFigurePointerMove}
                onPointerLeave={onFigurePointerLeave}
            >
                <FadeIn y={50} duration={1.6} autoAlpha={1}>
                    <Image
                        src={project.image}
                        quality={90}
                        alt={project.title}
                        width={1400}
                        height={1600}
                        loading={"lazy"}
                        data-project-image
                        className={`${styles.image} ${styles[project.direction]}`}
                    />
                </FadeIn>

                <div className={styles.floatingDockWrapper}>
                    <div className={styles.projectInfo}>
                        <span className={styles.projectCompany}>{project.company}</span>
                        <span className={styles.projectTitle}>{project.title}</span>
                    </div>
                    <FloatingDock
                        items={dockItems}
                        desktopClassName={styles.floatingDockDesktop}
                        mobileClassName={styles.floatingDockMobile}
                    />
                </div>
            </figure>
        </div>
    );
}

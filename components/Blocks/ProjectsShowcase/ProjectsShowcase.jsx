"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconInfoCircle, IconBrandGithub, IconBrandDribbble, IconExternalLink, IconArrowLeft } from "@tabler/icons-react";
import styles from './ProjectsShowcase.module.scss';
import ProjectJourney from '@/database/ProjectJourney.json';
import Container from "@/components/UI/Layout/Layout";
import Title from "@/components/UI/Elements/Title/Title";
import GooeyNav from '@/components/GooeyNav';
import Particles from '@/components/UI/Particles/Particles';

const categoryItems = [
  { label: '🔥 All Designs', href: '#' },
  { label: '🌐 Websites', href: '#' },
  { label: '📱 Applications', href: '#' },
  { label: '💚 Dashboards', href: '#' }
];

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState(0);
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  // Override the GooeyNav click to update our state
  const handleCategoryChange = (index) => {
    setActiveCategory(index);
  };

  return (
    <section className={styles.section}>
      {/* Particles Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <Particles 
          particleCount={200}
          spread={10}
          speed={0.1}
          particleColors={['#FFD700', '#FFA500', '#FF8C00', '#FFFFFF']}
          hover={true}
          alpha={0.8}
          size={10}
          rotation={true}
        />
      </div>

      <Container>
        {/* Back Button */}
        <div className={styles.backButtonWrapper}>
          <button onClick={handleBackClick} className={styles.backButton}>
            <IconArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </button>
        </div>

        <header className={styles.header}>
          <Title color={'white'}>
            <span>Showcasing</span> the best! 🚀
          </Title>
        </header>

        {/* Category Filter with GooeyNav */}
        <div className={styles.categoryFilter}>
          <GooeyNav 
            items={categoryItems.map((item, idx) => ({
              ...item,
              href: '#',
              onClick: (e) => {
                e.preventDefault();
                handleCategoryChange(idx);
              }
            }))}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={activeCategory}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {ProjectJourney.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={styles.projectCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          className={styles.projectImage}
        />
        <div className={styles.overlay}>
          <div className={styles.projectInfo}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectCompany}>{project.company}</p>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.projectMeta}>
          <h4 className={styles.cardTitle}>{project.title}</h4>
          <span className={styles.cardCompany}>{project.company}</span>
        </div>

        <div className={styles.actionButtons}>
          <Link href={`/project/${project.id}`} className={styles.actionButton}>
            <IconInfoCircle size={18} />
          </Link>
          
          {project.links.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.actionButton}
            >
              <IconBrandGithub size={18} />
            </a>
          )}
          
          {project.links.dribbble && (
            <a 
              href={project.links.dribbble} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.actionButton}
            >
              <IconBrandDribbble size={18} />
            </a>
          )}
          
          {project.links.live && (
            <a 
              href={project.links.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.actionButton}
            >
              <IconExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

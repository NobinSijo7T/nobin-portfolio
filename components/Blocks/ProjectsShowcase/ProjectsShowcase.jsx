"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconInfoCircle, IconBrandGithub, IconBrandDribbble, IconExternalLink } from "@tabler/icons-react";
import styles from './ProjectsShowcase.module.scss';
import ProjectJourney from '@/database/ProjectJourney.json';
import Container from "@/components/UI/Layout/Layout";
import Title from "@/components/UI/Elements/Title/Title";

const categories = ['All Designs', 'Websites', 'Applications', 'Dashboards'];

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All Designs');

  return (
    <section className={styles.section}>
      <Container>
        <header className={styles.header}>
          <Title color={'white'}>
            <span>Showcasing</span> the best! 🚀
          </Title>
        </header>

        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'All Designs' && '🔥 '}
              {category === 'Websites' && '🌐 '}
              {category === 'Applications' && '📱 '}
              {category === 'Dashboards' && '💚 '}
              {category}
            </button>
          ))}
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

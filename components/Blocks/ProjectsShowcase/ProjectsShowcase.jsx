"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBrandBehance,
  IconBrandDribbble,
  IconBrandGithub,
  IconExternalLink,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import styles from './ProjectsShowcase.module.scss';
import ProjectJourney from '@/database/ProjectJourney.json';
import graphicWorks from '@/database/config/graphic-works.json';
import Container from "@/components/UI/Layout/Layout";

const categories = [
  { label: 'All Work', value: 'all' },
  { label: 'Web Platforms', value: 'web' },
  { label: 'Applications', value: 'app' },
  { label: 'Design Systems', value: 'design' },
];

const categoryMatchers = {
  all: () => true,
  web: (project) => {
    const haystack = `${project.company} ${project.description} ${project.technologies?.join(' ')}`.toLowerCase();
    return ['web', 'next', 'react', 'vue', 'platform', 'browser', 'site'].some((word) => haystack.includes(word));
  },
  app: (project) => {
    const haystack = `${project.title} ${project.description} ${project.technologies?.join(' ')}`.toLowerCase();
    return ['app', 'mobile', 'canvas', 'task', 'streaming', 'gaming', 'application'].some((word) => haystack.includes(word));
  },
  design: (project) => {
    const haystack = `${project.description} ${project.technologies?.join(' ')}`.toLowerCase();
    return ['figma', 'ui/ux', 'branding', 'identity', 'interface', 'design'].some((word) => haystack.includes(word));
  },
};

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();

  const filteredProjects = useMemo(() => {
    const matcher = categoryMatchers[activeCategory] || categoryMatchers.all;
    return ProjectJourney.filter(matcher);
  }, [activeCategory]);

  return (
    <section className={styles.section}>
      <AnimatedBackground />

      <Container className={styles.container}>
        <div className={styles.backButtonWrapper}>
          <button
            onClick={() => router.back()}
            className={styles.backButton}
            aria-label="Back to portfolio"
            title="Back"
          >
            <IconArrowLeft size={20} strokeWidth={1.8} />
          </button>
        </div>

        <header className={styles.hero}>
          <p className={styles.eyebrow}>Selected archive</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>
              <span className={styles.heroTitleMuted}>Projects</span> shaped for
            </span>
            <span className={styles.heroTitleLine}>useful interfaces.</span>
          </h1>
          <p className={styles.heroDescription}>
            A compact archive of product interfaces, experiments, visual systems, and shipped web experiences.
          </p>
          <div className={styles.heroMeta} aria-label="Project archive statistics">
            <span>{ProjectJourney.length} case studies</span>
            <span>{graphicWorks.length} visual works</span>
            <span>Design + development</span>
          </div>
        </header>

        <div className={styles.categoryFilter} aria-label="Project categories">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              className={`${styles.categoryButton} ${activeCategory === category.value ? styles.categoryButtonActive : ''}`}
              onClick={() => setActiveCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <GraphicWorksSection />
      </Container>
    </section>
  );
}

function AnimatedBackground() {
  return (
    <div className={styles.background} aria-hidden="true" />
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className={styles.projectCard}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.24), ease: 'easeOut' }}
    >
      <Link href={`/project/${project.id}`} className={styles.imageWrapper} aria-label={`View ${project.title} case study`}>
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className={styles.projectImage}
        />
        <div className={styles.imageScrim}>
          <IconArrowUpRight size={22} strokeWidth={1.7} />
        </div>
      </Link>

      <div className={styles.cardFooter}>
        <div className={styles.projectMeta}>
          <span className={styles.cardCompany}>{project.company}</span>
          <h2 className={styles.cardTitle}>{project.title}</h2>
          <p className={styles.projectDescription}>{project.description}</p>
        </div>

        <div className={styles.techList} aria-label={`${project.title} technologies`}>
          {project.technologies?.slice(0, 3).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className={styles.actionButtons}>
          <Link href={`/project/${project.id}`} className={styles.actionButton} aria-label={`${project.title} details`}>
            <IconInfoCircle size={18} strokeWidth={1.7} />
          </Link>

          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={styles.actionButton} aria-label={`${project.title} GitHub`}>
              <IconBrandGithub size={18} strokeWidth={1.7} />
            </a>
          )}

          {project.links.dribbble && (
            <a href={project.links.dribbble} target="_blank" rel="noopener noreferrer" className={styles.actionButton} aria-label={`${project.title} Dribbble`}>
              <IconBrandDribbble size={18} strokeWidth={1.7} />
            </a>
          )}

          {project.links.behance && (
            <a href={project.links.behance} target="_blank" rel="noopener noreferrer" className={styles.actionButton} aria-label={`${project.title} Behance`}>
              <IconBrandBehance size={18} strokeWidth={1.7} />
            </a>
          )}

          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={styles.actionButton} aria-label={`${project.title} live site`}>
              <IconExternalLink size={18} strokeWidth={1.7} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function GraphicWorksSection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const displayedWorks = showAll ? graphicWorks : graphicWorks.slice(0, 8);

  return (
    <section className={styles.graphicWorksSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Visual explorations</p>
        <h2 className={styles.sectionTitle}>Graphic works</h2>
      </div>

      <div className={styles.graphicWorksGrid}>
        {displayedWorks.map((work) => (
          <button
            type="button"
            key={work.id}
            className={styles.graphicWorkCard}
            onClick={() => setSelectedImage(work)}
            aria-label={`Open ${work.title}`}
          >
            <Image
              src={work.image}
              alt={work.title}
              width={500}
              height={500}
              sizes="(max-width: 768px) 50vw, 25vw"
              loading="lazy"
              className={styles.graphicWorkImage}
            />
          </button>
        ))}
      </div>

      <div className={styles.viewMoreWrapper}>
        <button
          type="button"
          className={styles.viewMoreButton}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : 'View more'}
          <IconArrowUpRight size={18} strokeWidth={1.8} />
        </button>
      </div>

      {selectedImage && (
        <div className={styles.imageOverlay} onClick={() => setSelectedImage(null)}>
          <button type="button" className={styles.closeButton} onClick={() => setSelectedImage(null)} aria-label="Close image">
            <IconX size={22} strokeWidth={1.8} />
          </button>
          <div className={styles.overlayContent} onClick={(event) => event.stopPropagation()}>
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              width={1200}
              height={1200}
              sizes="90vw"
              className={styles.overlayImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}

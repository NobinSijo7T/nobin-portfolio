"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StaggeredGrid } from '@/src/components/ui/staggered-grid';
import ProjectJourney from '@/database/ProjectJourney.json';
import Container from '@/components/UI/Layout/Layout';
import { IconBrandGithub, IconBrandDribbble, IconExternalLink } from "@tabler/icons-react";

// Technology icon mapping for display
const getTechnologyStack = (technologies) => {
    const iconMap = {
        'React': { name: 'React', color: '#61DAFB' },
        'Next.js': { name: 'Next.js', color: '#000000' },
        'Node.js': { name: 'Node.js', color: '#68A063' },
        'MongoDB': { name: 'MongoDB', color: '#47A248' },
        'Express': { name: 'Express', color: '#000000' },
        'JavaScript': { name: 'JavaScript', color: '#F7DF1E' },
        'TypeScript': { name: 'TypeScript', color: '#3178C6' },
        'CSS3': { name: 'CSS3', color: '#1572B6' },
        'Python': { name: 'Python', color: '#3776AB' },
        'PostgreSQL': { name: 'PostgreSQL', color: '#336791' },
        'Vue.js': { name: 'Vue.js', color: '#4FC08D' },
        'Mapbox': { name: 'Mapbox', color: '#000000' },
        'Firebase': { name: 'Firebase', color: '#FFCA28' },
        'Socket.io': { name: 'Socket.io', color: '#010101' },
        'TensorFlow': { name: 'TensorFlow', color: '#FF6F00' },
        'FastAPI': { name: 'FastAPI', color: '#009688' },
        'Docker': { name: 'Docker', color: '#2496ED' },
        'Prisma': { name: 'Prisma', color: '#2D3748' },
        'Stripe': { name: 'Stripe', color: '#635BFF' },
        'GraphQL': { name: 'GraphQL', color: '#E10098' },
        'Canvas API': { name: 'Canvas API', color: '#FF6B6B' },
        'Local Storage': { name: 'Local Storage', color: '#4CAF50' },
        'Spotify API': { name: 'Spotify API', color: '#1DB954' }
    };

    return technologies.map(tech => iconMap[tech] || { name: tech, color: '#666666' });
};

export default function ProjectDetails({ params }) {
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [unwrappedParams, setUnwrappedParams] = useState(null);

    useEffect(() => {
        params.then(p => {
            setUnwrappedParams(p);
            const foundProject = ProjectJourney.find(proj => proj.id === p.id);
            setProject(foundProject);
        });
    }, [params]);

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-gray-400 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                    >
                        Back to Portfolio
                    </button>
                </div>
            </div>
        );
    }

    // Prepare images for StaggeredGrid - use project image multiple times
    const images = Array(10).fill(project.image);

    // Prepare bento items for technology stack and links
    const technologyStack = getTechnologyStack(project.technologies);

    const bentoItems = [
        ...(project.links.github ? [{
            id: 'github',
            title: 'GitHub',
            image: project.image,
            icon: <IconBrandGithub className="w-8 h-8" />,
            link: project.links.github,
            type: 'link'
        }] : []),
        ...(project.links.dribbble ? [{
            id: 'dribbble',
            title: 'Dribbble',
            image: project.image,
            icon: <IconBrandDribbble className="w-8 h-8" />,
            link: project.links.dribbble,
            type: 'link'
        }] : []),
        ...(project.links.live ? [{
            id: 'live',
            title: 'Live Demo',
            image: project.image,
            icon: <IconExternalLink className="w-8 h-8" />,
            link: project.links.live,
            type: 'link'
        }] : [])
    ];

    return (
        <div className="relative min-h-screen bg-black">
            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            {/* Staggered Grid with Project Info */}
            <StaggeredGrid
                images={images}
                bentoItems={bentoItems}
                techStack={technologyStack}
                centerText={project.title.split(' ')[0] || 'Project'}
                showFooter={false}
                className="min-h-screen"
                projectTitle={project.title}
                projectCompany={project.company}
                projectDescription={project.description}
            >
                {/* Quick Links Section */}
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                        >
                            <IconBrandGithub className="w-5 h-5" />
                            <span>View Code</span>
                        </a>
                    )}
                    {project.links.dribbble && (
                        <a
                            href={project.links.dribbble}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-pink-500/20 backdrop-blur-md rounded-full text-pink-400 hover:bg-pink-500/30 transition-all duration-300 border border-pink-500/30"
                        >
                            <IconBrandDribbble className="w-5 h-5" />
                            <span>Dribbble</span>
                        </a>
                    )}
                    {project.links.live && (
                        <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-yellow-500/20 backdrop-blur-md rounded-full text-yellow-400 hover:bg-yellow-500/30 transition-all duration-300 border border-yellow-500/30"
                        >
                            <IconExternalLink className="w-5 h-5" />
                            <span>Live Demo</span>
                        </a>
                    )}
                </div>
            </StaggeredGrid>
        </div>
    );
}

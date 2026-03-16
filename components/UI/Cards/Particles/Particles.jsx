import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

import './Particles.module.scss';

const Particles = ({ className }) => {
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Set up scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false,
            powerPreference: 'default'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Append renderer's DOM element to the sceneRef
        sceneRef.current.appendChild(renderer.domElement);

        // Set transparent background
        renderer.setClearAlpha(0);

        // Create particles
        const particles = new THREE.Group();
        const particleGeometry = new THREE.BufferGeometry();
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            sizeAttenuation: true,
        });

        const numParticles = 500;
        const positions = new Float32Array(numParticles * 3);
        const colors = new Float32Array(numParticles * 3);

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;

            if (i % 2 === 0) {
                colors[i] = 1;
                colors[i + 1] = 1;
                colors[i + 2] = 1;
            } else {
                colors[i] = 66 / 255;
                colors[i + 1] = 118 / 255;
                colors[i + 2] = 195 / 255;
            }
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        particles.add(particleSystem);
        scene.add(particles);

        // Set up camera position
        camera.position.z = 5;

        // Mouse movement interaction
        const mouse = new THREE.Vector2(0, 0);
        const targetMouse = new THREE.Vector2(0, 0);
        let animationFrameId;

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Add animation
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const time = Date.now() * 0.0001;
            const positions = particleGeometry.attributes.position.array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] = Math.sin(i / 100 + time);
            }

            particleGeometry.attributes.position.needsUpdate = true;

            targetMouse.x += (mouse.x * 0.2 - targetMouse.x) * 0.02;
            targetMouse.y += (-mouse.y * 0.2 - targetMouse.y) * 0.02;

            gsap.to(particles.rotation, {
                x: targetMouse.x,
                y: targetMouse.y,
                duration: 1,
            });

            renderer.render(scene, camera);
        };

        animate();

        // Resize handling
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Clean up Three.js resources on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            particleGeometry.dispose();
            particleMaterial.dispose();
            scene.remove(particles);
        };
    }, []);

    return <div className={className} ref={sceneRef}></div>;
};

export default memo(Particles);

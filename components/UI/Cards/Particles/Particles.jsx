import React, {useEffect, useRef, memo} from 'react';

const Particles = ({className}) => {
    const sceneRef = useRef(null);

    useEffect(() => {
        const root = sceneRef.current;
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (!root || motionQuery.matches) return;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', {alpha: true});

        if (!context) return;

        canvas.setAttribute('aria-hidden', 'true');
        canvas.style.display = 'block';
        root.appendChild(canvas);

        let width = 0;
        let height = 0;
        let dpr = 1;
        let animationFrameId = null;
        let previousTime = performance.now();
        let particles = [];
        let isStopped = false;

        const resetParticle = (particle, startAnywhere = false) => {
            particle.x = Math.random() * width;
            particle.y = startAnywhere ? Math.random() * height : height + Math.random() * height * 0.2;
            particle.radius = 0.6 + Math.random() * 1.7;
            particle.glow = particle.radius * (4 + Math.random() * 4);
            particle.speed = 0.08 + Math.random() * 0.18;
            particle.drift = (Math.random() - 0.5) * 0.16;
            particle.life = startAnywhere ? Math.random() : 0;
            particle.decay = 0.0018 + Math.random() * 0.0024;
            particle.alpha = 0.4 + Math.random() * 0.2;
        };

        const resize = () => {
            const bounds = root.getBoundingClientRect();
            width = Math.max(bounds.width, window.innerWidth);
            height = Math.max(bounds.height, window.innerHeight);
            dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            const particleCount = Math.min(90, Math.max(38, Math.floor(width / 20)));
            particles = Array.from({length: particleCount}, () => {
                const particle = {};
                resetParticle(particle, true);
                return particle;
            });
        };

        const drawParticle = (particle) => {
            const opacity = particle.alpha * Math.sin(particle.life * Math.PI);

            if (opacity <= 0) return;

            const gradient = context.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                particle.glow
            );

            gradient.addColorStop(0, `rgba(255, 205, 138, ${opacity})`);
            gradient.addColorStop(0.35, `rgba(232, 131, 106, ${opacity * 0.55})`);
            gradient.addColorStop(1, 'rgba(232, 131, 106, 0)');

            context.fillStyle = gradient;
            context.beginPath();
            context.arc(particle.x, particle.y, particle.glow, 0, Math.PI * 2);
            context.fill();
        };

        const animate = (time) => {
            if (isStopped) return;

            const delta = Math.min((time - previousTime) / 16.67, 2);
            previousTime = time;

            context.clearRect(0, 0, width, height);
            context.globalCompositeOperation = 'lighter';

            particles.forEach((particle) => {
                particle.y -= particle.speed * delta;
                particle.x += particle.drift * delta;
                particle.life += particle.decay * delta;

                if (particle.life >= 1 || particle.y < -particle.glow || particle.x < -particle.glow || particle.x > width + particle.glow) {
                    resetParticle(particle);
                }

                drawParticle(particle);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animationFrameId = requestAnimationFrame(animate);
        window.addEventListener('resize', resize);

        const stop = () => {
            if (isStopped) return;

            isStopped = true;
            window.removeEventListener('resize', resize);

            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }

            canvas.remove();
        };

        const handleMotionPreferenceChange = () => {
            if (motionQuery.matches) {
                stop();
            }
        };

        if (motionQuery.addEventListener) {
            motionQuery.addEventListener('change', handleMotionPreferenceChange);
        } else {
            motionQuery.addListener(handleMotionPreferenceChange);
        }

        return () => {
            if (motionQuery.removeEventListener) {
                motionQuery.removeEventListener('change', handleMotionPreferenceChange);
            } else {
                motionQuery.removeListener(handleMotionPreferenceChange);
            }

            stop();
        };
    }, []);

    return <div className={className} ref={sceneRef}></div>;
};

export default memo(Particles);

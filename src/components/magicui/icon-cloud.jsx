"use client";
import React, { useEffect, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({
  icons,
  images
}) {
  const containerRef = useRef(null);
  const [iconPositions, setIconPositions] = useState([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameRef = useRef();
  const rotationRef = useRef(rotation);

  // Handle client-side mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate initial icon positions on a sphere with denser distribution
  useEffect(() => {
    const items = icons || images || [];
    const newIcons = [];
    const numIcons = items.length || 20;

    // Denser Fibonacci sphere parameters for tighter clustering
    const offset = 1.5 / numIcons; // Reduced from 2 to 1.5 for denser distribution
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 0.75 + offset / 2; // Adjusted for denser clustering
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * 80, // Reduced from 100 to 80 for denser sphere
        y: y * 80,
        z: z * 80,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);

  // Handle mouse events
  const handleMouseDown = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !containerRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const rect = containerRef.current?.getBoundingClientRect();
      const centerX = rect ? rect.width / 2 : 200;
      const centerY = rect ? rect.height / 2 : 200;
      const screenX = centerX + rotatedX;
      const screenY = centerY + rotatedY;

      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    });

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Animation and rendering
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.005 + (distance / maxDistance) * 0.015; // Increased speed for denser movement

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
        } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / rect.height) * speed,
          y: rotationRef.current.y + (dx / rect.width) * speed,
        };
      }

      // Update icon positions
      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = (rotatedZ + 160) / 240; // Adjusted for denser sphere
        const opacity = Math.max(0.3, Math.min(1, (rotatedZ + 120) / 160)); // Adjusted for denser sphere

        const screenX = centerX + rotatedX;
        const screenY = centerY + rotatedY;

        const iconElement = container.children[index];
        if (iconElement) {
          iconElement.style.transform = `translate(${screenX - 20}px, ${screenY - 20}px) scale(${scale})`;
          iconElement.style.opacity = opacity;
          iconElement.style.zIndex = Math.round(rotatedZ + 200);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation]);

  const items = icons || images || [];

  // Don't render on server side to prevent hydration errors
  if (!isMounted) {
    return (
      <div 
        className="relative w-full h-full max-w-[250px] max-h-[250px] sm:max-w-[300px] sm:max-h-[300px] md:max-w-[400px] md:max-h-[400px] mx-auto"
        style={{ 
          perspective: '1000px',
          width: '100%',
          height: '100%',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Interactive 3D Icon Cloud"
        role="img"
      >
        <div className="text-white text-sm opacity-50">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-w-[250px] max-h-[250px] sm:max-w-[300px] sm:max-h-[300px] md:max-w-[400px] md:max-h-[400px] mx-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ 
        perspective: '1000px',
        width: '100%',
        height: '100%',
        minHeight: '200px'
      }}
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="absolute w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center pointer-events-none"
          style={{
            transform: 'translate(50%, 50%) scale(0)',
            opacity: 0,
            transition: 'none'
          }}
        >
          {images ? (
            <img
              src={item}
              alt={`Icon ${index + 1}`}
              className="w-full h-full object-contain rounded-full filter brightness-0 invert"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {React.cloneElement(item, {
                width: 32,
                height: 32,
                className: "w-full h-full",
                style: { 
                  filter: 'brightness(0) invert(1)',
                  color: 'white',
                  fill: 'white'
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
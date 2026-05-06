"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./HomeIntro.module.scss";

export default function HomeIntro({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [trails, setTrails] = useState([]);
  const trailIdRef = useRef(0);
  const lastTrailRef = useRef({ time: 0, x: 0, y: 0 });
  const pointerRef = useRef(null);
  const followerRef = useRef(null);
  const sceneRectRef = useRef(null);
  const rafRef = useRef(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    document.body.classList.toggle("home-intro-active", showIntro);

    return () => document.body.classList.remove("home-intro-active");
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) {
      return undefined;
    }

    const tick = () => {
      if (pointerRef.current && sceneRectRef.current && hasInteractedRef.current) {
        const target = pointerRef.current;
        const follower = followerRef.current ?? target;
        const x = follower.x + (target.x - follower.x) * 0.28;
        const y = follower.y + (target.y - follower.y) * 0.28;

        followerRef.current = { x, y };
        addTrailAt(x, y, sceneRectRef.current);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafRef.current);
  }, [showIntro]);

  const addTrailAt = (x, y, rect) => {
    const now = performance.now();
    const previous = lastTrailRef.current;
    const distance = Math.hypot(x - previous.x, y - previous.y);

    if (now - previous.time < 26 || distance < 10) {
      return;
    }

    lastTrailRef.current = { time: now, x, y };

    const id = trailIdRef.current;
    trailIdRef.current += 1;

    const size = Math.max(150, Math.min(310, rect.width * 0.18));
    const trail = {
      id,
      x,
      y,
      r: size / 2,
      r2: size * 0.36,
      r3: size * 0.18,
    };

    setTrails((currentTrails) => [...currentTrails.slice(-11), trail]);

    window.setTimeout(() => {
      setTrails((currentTrails) => currentTrails.filter((item) => item.id !== id));
    }, 1150);
  };

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    sceneRectRef.current = rect;
    pointerRef.current = { x, y };

    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      followerRef.current = { x, y };
      addTrailAt(x, y, rect);
    }
  };

  const handleContinue = () => {
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (!showIntro) {
    return children;
  }

  return (
    <section className={styles.intro} aria-label="Portfolio intro">
      <div className={styles.scene} onPointerMove={handlePointerMove} onPointerDown={handlePointerMove} aria-hidden="true">
        <img className={styles.baseImage} src="/base-image.png" alt="" draggable="false" />

        {trails.map((trail) => (
          <span
            key={trail.id}
            className={styles.trailReveal}
            style={{
              "--x": `${trail.x}px`,
              "--y": `${trail.y}px`,
              "--r": `${trail.r}px`,
              "--r2": `${trail.r2}px`,
              "--r3": `${trail.r3}px`,
            }}
          />
        ))}

        <span className={styles.scanline} />
        <span className={styles.grain} />
        <span className={styles.vignette} />
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.continueButton} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import styles from './LogoRibbon.module.scss';
import FancyButton from '@/components/UI/Elements/Button/Button';

const logos = [
  { name: 'IEDC', src: '/logo/iedc.png' },
  { name: 'IEEE', src: '/logo/ieee - Edited.png' },
  { name: 'IIC', src: '/logo/iic.png' },
  { name: 'MuLearn', src: '/logo/mulearn-white-logo.png' },
  { name: 'Tilt Labs', src: '/logo/tiltlabs.png' },
  { name: 'TinkerHub', src: '/logo/TinkerHub_Foundation.png' },
];

export default function LogoRibbon() {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className={styles.section}>
      <div className={styles.ribbonContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Trusted by Amazing Clients</h2>
            <p className={styles.description}>
              Building exceptional digital experiences and delivering innovative solutions that drive real results. Explore my gallery to see the creative journey and achievements.
            </p>
          </div>
          <FancyButton theme='button-2' link='/gallery'>
            Gallery
          </FancyButton>
        </div>

        <div className={styles.ribbonWrapper}>
          {/* First ribbon - moving right, tilted down */}
          <div className={styles.ribbon}>
            <div className={styles.ribbonTrack}>
              {duplicatedLogos.map((logo, index) => (
                <div key={`ribbon1-${index}`} className={styles.logoItem}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className={styles.logoImage}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second ribbon - moving left, tilted up (crossing) */}
          <div className={`${styles.ribbon} ${styles.ribbonReverse}`}>
            <div className={styles.ribbonTrack}>
              {duplicatedLogos.map((logo, index) => (
                <div key={`ribbon2-${index}`} className={styles.logoItem}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className={styles.logoImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

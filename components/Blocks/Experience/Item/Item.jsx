'use client';
import React from 'react'
import Link from 'next/link';
import styles from './Item.module.scss';
export default function Item({position, company, duration, location, href}) {

    return (
        <Link href={href} className={styles.item}>
          <div className={styles.left}>
            <div className={styles.title}>
              <h3 data-text={position}>{position}</h3>
            </div>
            <span className={`${styles.info}`}>{company}</span>
          </div>
          <div className={styles.right}>
            <span className={styles.info}>{duration}</span>
            <span className={styles.info}>{location}</span>
          </div>
        </Link>
    )
}
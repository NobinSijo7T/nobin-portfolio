"use client";

import React from 'react';
import styles from './Experience.module.scss';
import Item from "@/components/Blocks/Experience/Item/Item";
import Title from "@/components/UI/Elements/Title/Title";
import Button from "@/components/UI/Elements/Button/Button";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
import { getExperienceEntries } from "@/utils/experience";

export default function ExperienceBlock() {
    const experienceEntries = getExperienceEntries();
    const featuredEntries = experienceEntries.slice(0, 4);

    return (
        <section className={styles.section} id={'experience'}>
            <Blobs type={'v2'} classVariable={`${styles.blob}`}/>
            <header className={styles.header}>
                <Title color={'white'}><span>Experience</span> <br/>History</Title>
            </header>
            {featuredEntries.map((item) => {
                const primaryPosition = item.positions?.[0];
                return (
                    <Item
                        company={item.company}
                        position={primaryPosition?.title || item.company}
                        duration={primaryPosition?.duration || ""}
                        location={primaryPosition?.location || "Remote"}
                        href={`/experience/${item.id}`}
                        key={item.id}
                    />
                );
            })}
            <div className={styles.action}>
                <Button element="link" link="/experience" theme="button-1">
                    Show More
                </Button>
            </div>
        </section>
    );
}
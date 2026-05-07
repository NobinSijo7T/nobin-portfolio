import Link from "next/link";
import Title from "@/components/UI/Elements/Title/Title";
import { getExperienceEntries } from "@/utils/experience";
import styles from "./experience.module.scss";

export const metadata = {
  title: "Experience History - Nobin Sijo | Portfolio",
  description: "Explore complete experience history and role details.",
};

export default function ExperienceHistoryPage() {
  const experienceEntries = getExperienceEntries();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/" className={styles.backLink}>
            Back Home
          </Link>
          <Title color="white">
            <span>Experience</span> <br /> History
          </Title>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className={styles.list}>
          {experienceEntries.map((item) => {
            const currentPosition = item.positions?.[0];
            return (
              <Link href={`/experience/${item.id}`} key={item.id} className={styles.card}>
                <div className={styles.left}>
                  <p className={styles.company}>{item.company}</p>
                  <h2 className={styles.role}>{currentPosition?.title || "Role"}</h2>
                </div>
                <div className={styles.right}>
                  <span>{currentPosition?.duration || "-"}</span>
                  <span>{currentPosition?.location || "Not specified"}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
